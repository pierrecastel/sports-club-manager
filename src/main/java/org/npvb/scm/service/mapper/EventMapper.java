package org.npvb.scm.service.mapper;

import org.npvb.scm.domain.*;
import org.npvb.scm.service.dto.EventDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Event and its DTO EventDTO.
 */
@Mapper(componentModel = "spring", uses = {TeamMapper.class, LocationMapper.class, UserMapper.class, })
public interface EventMapper {

    @Mapping(source = "team.id", target = "teamId")
    @Mapping(source = "location.id", target = "locationId")
    EventDTO eventToEventDTO(Event event);

    List<EventDTO> eventsToEventDTOs(List<Event> events);

    @Mapping(source = "teamId", target = "team")
    @Mapping(source = "locationId", target = "location")
    Event eventDTOToEvent(EventDTO eventDTO);

    List<Event> eventDTOsToEvents(List<EventDTO> eventDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default Event eventFromId(Long id) {
        if (id == null) {
            return null;
        }
        Event event = new Event();
        event.setId(id);
        return event;
    }
    

}
