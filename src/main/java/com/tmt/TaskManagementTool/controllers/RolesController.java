package com.tmt.TaskManagementTool.controllers;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.tmt.TaskManagementTool.models.Role;
import com.tmt.TaskManagementTool.models.User;
import com.tmt.TaskManagementTool.services.AuthService;
import com.tmt.TaskManagementTool.services.RoleService;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/roles")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@Slf4j
public class RolesController {

    @Autowired
    private RoleService roleService;

    @Autowired
    private AuthService authService;

    /**
     * Show all roles in the databse
     * 
     * @return
     */
    @GetMapping
    public ResponseEntity<List<Role>> showAllRoles() {
        return new ResponseEntity<List<Role>>(roleService.getAllRole(), HttpStatus.OK);
    }

    /**
     * Get Role by name
     * @param name
     * @return
     */
    @GetMapping("/{name}")
    public ResponseEntity<Role> getRole(@PathVariable String name) {
        return new ResponseEntity<Role>(roleService.getRoleByName(name), HttpStatus.OK);
    }

    /**
     * 
     * @param reqString
     * @return
     */
    @PutMapping("/create-role")
    public ResponseEntity<Role> createRole(@RequestBody String reqString, HttpSession session) {
       // User user = authService.getCurrentUser(session);
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                JsonNode jsonNode = objectMapper.readTree(reqString);
                Role role = new Role();
                role.setRid(jsonNode.get("rid").asText());
                role.setName(jsonNode.get("name").asText());
                ArrayNode permissionNode = (ArrayNode) jsonNode.get("permissions");
                    List<String> permissions = new ArrayList<>();
                    for (JsonNode per : permissionNode) {
                        permissions.add(per.asText());
                    }
                    role.setPermissions(permissions);
                
                return new ResponseEntity<Role>(roleService.createRole(role), HttpStatus.OK);
            } catch (Exception e) {
                log.error("Cannot create new Role", e);
                return new ResponseEntity<Role>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        
        //log.info("Logged in user does not have the permission to create role");
        //return new ResponseEntity<Role>(HttpStatus.UNAUTHORIZED);
    }

    /**
     * Edit Role
     * 
     * @param name
     * @param role
     * @return
     */
    @PutMapping("/edit-role/{rid}")
    public ResponseEntity<Role> updateRole(@PathVariable String rid, @RequestBody String reqString,
            HttpSession session) {
        User user = authService.getCurrentUser(session);
        if (user.getRole().equals(roleService.getRoleByName("Manager"))) {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                JsonNode jsonNode = objectMapper.readTree(reqString);
                Role role = roleService.getRoleByRid(rid);
                role.setName(jsonNode.get("name").asText());
                ArrayNode permissionNode = (ArrayNode) jsonNode.get("permissions");
                List<String> permissions = new ArrayList<>();
                    for (JsonNode per : permissionNode) {
                        permissions.add(per.asText());
                    }
                    role.setPermissions(permissions);
                
                return new ResponseEntity<Role>(roleService.updateRole(role), HttpStatus.OK);
            } catch (Exception e) {
                log.error("Cannot update Role", e);
                return new ResponseEntity<Role>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        log.error("Logged in user does not have the permission to edit role");
        return new ResponseEntity<Role>(HttpStatus.UNAUTHORIZED);
    }

    /**
     * Delete role by name
     * 
     * @param name
     */
    @GetMapping("/delete-role/{name}")
    public void deleteRole(@PathVariable String name) {
        roleService.deleteRole(name);
    }

    /**
     * Create permissions for role
     * 
     * @param requestBody
     * @param rid
     * @return
     */
    @PostMapping("/{rid}/create-Permission")
    public ResponseEntity<Role> createPermission(@RequestBody String requestBody, String rid, HttpSession session) {
        User user = authService.getCurrentUser(session);
        if (user.getRole().equals(roleService.getRoleByName("Manager"))) {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                JsonNode jsonNode = objectMapper.readTree(requestBody);
                ArrayNode permissionNode = (ArrayNode) jsonNode.get("permissions");
                Role role = roleService.getRoleByRid(rid);
                
                    List<String> permissions = role.getPermissions();
                    for (JsonNode permission : permissionNode) {
                        permissions.add(permission.asText());
                    }
                    role.setPermissions(permissions);
                
                return new ResponseEntity<Role>(roleService.updateRole(role), HttpStatus.CREATED);
            } catch (Exception e) {
                log.error("Error creating permission", e);
                return new ResponseEntity<Role>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        log.error("Logged in user Not authorized");
        return new ResponseEntity<Role>(HttpStatus.UNAUTHORIZED);
    }

    /**
     * Update permissions for role
     * 
     * @param requestBody
     * @param rid
     * @return
     */
    @PostMapping("/{rid}/update-Permission")
    public ResponseEntity<Role> updatePermissions(@RequestBody String requestBody, String rid, HttpSession session) {
        User user = authService.getCurrentUser(session);
        if (user.getRole().equals(roleService.getRoleByName("Manager"))) {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                JsonNode jsonNode = objectMapper.readTree(requestBody);
                ArrayNode permissionNode = (ArrayNode) jsonNode.get("permissions");
                Role role = roleService.getRoleByRid(rid);
                
                    List<String> permissions = new ArrayList<>();
                    for (JsonNode permission : permissionNode) {
                        permissions.add(permission.asText());
                    }
                    role.setPermissions(permissions);
                
                return new ResponseEntity<Role>(roleService.updateRole(role), HttpStatus.CREATED);
            } catch (Exception e) {
                log.error("Error updating permission", e);
                return new ResponseEntity<Role>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        log.error("Logged in user Not authorized");
        return new ResponseEntity<Role>(HttpStatus.UNAUTHORIZED);
    }

    /**
     * Get all permissions assigned to a role
     * 
     * @param name
     * @return
     */
    @GetMapping("/{rid}/permissions")
    public ResponseEntity<List<String>> getPermissionsForRole(@PathVariable String rid) {
        Role role = roleService.getRoleByRid(rid);
        return new ResponseEntity<List<String>>(role.getPermissions(), HttpStatus.OK);
    }

    /**
     * Delete permission for a role
     * 
     * @param pid
     */
    @PostMapping("/delete-permission")
    public void deletePermissionForRole(@RequestParam("name") String name, @RequestBody String permission) {
        Role role = roleService.getRoleByName(name);
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode jsonNode = objectMapper.readTree(permission);
            String per = jsonNode.get("permission").asText();
            List<String> rolePermList = role.getPermissions();
            boolean found = rolePermList.stream().anyMatch(
                    r -> r.equalsIgnoreCase(per));
            if (found) {
                rolePermList.remove(per);
                roleService.updateRole(role);
                log.info("Permission deleted");
            } else {
                log.error("Permission not found: " + per);
            }
        } catch (JsonProcessingException e) {
            System.out.println("Error processing permission");
        }
    }

}
