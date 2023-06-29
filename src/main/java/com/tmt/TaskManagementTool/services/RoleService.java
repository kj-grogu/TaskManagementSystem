package com.tmt.TaskManagementTool.services;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tmt.TaskManagementTool.models.Role;
import com.tmt.TaskManagementTool.repositories.RoleRepository;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public List<Role> getAllRole() {
        return roleRepository.findAll();
    }

    public Optional<Role> getRoleById(ObjectId id) {
        return roleRepository.findById(id);
    }

    public Role getRoleByRid(String rid) {
        Optional<Role> roleOptional = roleRepository.getRoleByRid(rid);
        Role role = roleOptional.orElseThrow(() -> new IllegalArgumentException("Role " + rid + " not found!"));
        return role;
    }

    public Role getRoleByName(String name) {
        Optional<Role> roleOptional = roleRepository.getRoleByName(name);
        Role role = roleOptional.orElseThrow(() -> new IllegalArgumentException("Role " + name + " not found!"));
        return role;
    }

    public Role createRole(Role role) {
        return roleRepository.insert(role);
    }

    public Role updateRole(Role role) {
        return roleRepository.save(role);
    }

    public void deleteRole(String name) {
        Optional<Role> role = roleRepository.getRoleByName(name);
        ObjectId id = role.get().getId();
        roleRepository.deleteById(id);
    }

    
}
