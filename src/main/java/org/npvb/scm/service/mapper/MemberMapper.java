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

    MemberDTO memberToMemberDTO(Member member);

    List<MemberDTO> membersToMemberDTOs(List<Member> members);

    Member memberDTOToMember(MemberDTO memberDTO);

    List<Member> memberDTOsToMembers(List<MemberDTO> memberDTOs);
}
