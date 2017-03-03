package org.npvb.scm.service.mapper;

import org.npvb.scm.domain.*;
import org.npvb.scm.service.dto.EventDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Event and its DTO EventDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, })
public interface EventMapper {

    @Mapping(source = "team.id", target = "teamId")
    EventDTO eventToEventDTO(Event event);

    List<EventDTO> eventsToEventDTOs(List<Event> events);

    @Mapping(source = "teamId", target = "team")
    Event eventDTOToEvent(EventDTO eventDTO);

    List<Event> eventDTOsToEvents(List<EventDTO> eventDTOs);

    default Team teamFromId(Long id) {
        if (id == null) {
            return null;
        }
        Team team = new Team();
        team.setId(id);
        return team;
    }
}
