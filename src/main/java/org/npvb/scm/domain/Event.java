package org.npvb.scm.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import org.npvb.scm.domain.enumeration.EventType;

/**
 * A Event.
 */
@Entity
@Table(name = "event")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Event implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "title", length = 100, nullable = false)
    private String title;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private EventType type;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Size(min = 1, max = 1000)
    @Column(name = "comment", length = 1000)
    private String comment;

    @OneToOne
    @JoinColumn(unique = true)
    private Team team;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "event_participant",
               joinColumns = @JoinColumn(name="events_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="participants_id", referencedColumnName="id"))
    private Set<User> participants = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Event title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public EventType getType() {
        return type;
    }

    public Event type(EventType type) {
        this.type = type;
        return this;
    }

    public void setType(EventType type) {
        this.type = type;
    }

    public LocalDate getDate() {
        return date;
    }

    public Event date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getComment() {
        return comment;
    }

    public Event comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Team getTeam() {
        return team;
    }

    public Event team(Team team) {
        this.team = team;
        return this;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public Set<User> getParticipants() {
        return participants;
    }

    public Event participants(Set<User> users) {
        this.participants = users;
        return this;
    }

    public Event addParticipant(User user) {
        this.participants.add(user);
        return this;
    }

    public Event removeParticipant(User user) {
        this.participants.remove(user);
        return this;
    }

    public void setParticipants(Set<User> users) {
        this.participants = users;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Event event = (Event) o;
        if (event.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, event.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Event{" +
            "id=" + id +
            ", title='" + title + "'" +
            ", type='" + type + "'" +
            ", date='" + date + "'" +
            ", comment='" + comment + "'" +
            '}';
    }
}
