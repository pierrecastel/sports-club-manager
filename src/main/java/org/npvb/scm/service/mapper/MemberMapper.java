package org.npvb.scm.service.mapper;

import org.npvb.scm.domain.*;
import org.npvb.scm.service.dto.MemberDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Member and its DTO MemberDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, AddressMapper.class, })
public interface MemberMapper {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "address.id", target = "addressId")
    MemberDTO memberToMemberDTO(Member member);

    List<MemberDTO> membersToMemberDTOs(List<Member> members);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "addressId", target = "address")
    Member memberDTOToMember(MemberDTO memberDTO);

    List<Member> memberDTOsToMembers(List<MemberDTO> memberDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default Member memberFromId(Long id) {
        if (id == null) {
            return null;
        }
        Member member = new Member();
        member.setId(id);
        return member;
    }
    

}
