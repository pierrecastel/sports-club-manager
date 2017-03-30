package org.npvb.scm.service.mapper;

import org.npvb.scm.domain.*;
import org.npvb.scm.service.dto.TeamDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Team and its DTO TeamDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, UserMapper.class, UserMapper.class, })
public interface TeamMapper {

    @Mapping(source = "manager.id", target = "managerId")
    @Mapping(source = "substitute.id", target = "substituteId")
    TeamDTO teamToTeamDTO(Team team);

    List<TeamDTO> teamsToTeamDTOs(List<Team> teams);

    @Mapping(source = "managerId", target = "manager")
    @Mapping(source = "substituteId", target = "substitute")
    Team teamDTOToTeam(TeamDTO teamDTO);

    List<Team> teamDTOsToTeams(List<TeamDTO> teamDTOs);
}
