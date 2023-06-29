package com.tmt.TaskManagementTool.services;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tmt.TaskManagementTool.models.Permission;
import com.tmt.TaskManagementTool.models.Role;
import com.tmt.TaskManagementTool.repositories.PermissionRepository;
import com.tmt.TaskManagementTool.repositories.RoleRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class PermissionService {

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private RoleRepository roleRepository;

    public List<Permission> getAllPermission() {
        return permissionRepository.findAll();
    }

    public Optional<Permission> getPermissionById(ObjectId id) {
        return permissionRepository.findById(id);
    }

    public Optional<Permission> getPermissionByPid(String pid) {
        return permissionRepository.getPermissionByPid(pid);
    }

    public Optional<Permission> getPermissionByName(String name) {
        return permissionRepository.getPermissionByName(name);
    }

    public Permission createPermissionForRole(Permission permission, String roleId) {
        if (permissionRepository.existsPermissionByName(permission.getName())){
            log.info("Permission already exists");
            return null;
        }
        /* Optional<Role> roleOptional = roleRepository.getRoleByRid(roleId);
        Role role = roleOptional.orElseThrow(()-> new IllegalArgumentException("role not found"));
        List<Permission> permissions = role.getPermissions();
        permissionRepository.insert(permission);
        permissions.add(permission);
        roleRepository.save(role); */
        
        return permissionRepository.insert(permission);
    }

    public Permission updatePermission(String pid, Permission Permission) {
        Optional<Permission> optPermission = permissionRepository.getPermissionByPid(pid);
        Permission r = optPermission.get(); 
        if (r.getPid() != null && r.getName() != null) {
            r.setPid(Permission.getPid());
            r.setName(Permission.getName());
        }
        return r;
    }

    public void deletePermission(String pid) {
        Optional<Permission> Permission = permissionRepository.getPermissionByPid(pid);
        ObjectId id = Permission.get().getId();
        permissionRepository.deleteById(id);
    }

    
}
