package org.npvb.scm.service.mapper;

import org.npvb.scm.domain.*;
import org.npvb.scm.service.dto.MemberDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Member and its DTO MemberDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface MemberMapper {

    @Mapping(source = "address.id", target = "addressId")
    MemberDTO memberToMemberDTO(Member member);

    List<MemberDTO> membersToMemberDTOs(List<Member> members);

    @Mapping(source = "addressId", target = "address")
    Member memberDTOToMember(MemberDTO memberDTO);

    List<Member> memberDTOsToMembers(List<MemberDTO> memberDTOs);

    default Address addressFromId(Long id) {
        if (id == null) {
            return null;
        }
        Address address = new Address();
        address.setId(id);
        return address;
    }
}
