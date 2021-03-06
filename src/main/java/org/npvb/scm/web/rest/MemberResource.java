package org.npvb.scm.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.npvb.scm.service.MemberService;
import org.npvb.scm.web.rest.util.HeaderUtil;
import org.npvb.scm.service.dto.MemberDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Member.
 */
@RestController
@RequestMapping("/api")
public class MemberResource {

    private final Logger log = LoggerFactory.getLogger(MemberResource.class);

    private static final String ENTITY_NAME = "member";
        
    private final MemberService memberService;

    public MemberResource(MemberService memberService) {
        this.memberService = memberService;
    }

    /**
     * POST  /members : Create a new member.
     *
     * @param memberDTO the memberDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new memberDTO, or with status 400 (Bad Request) if the member has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/members")
    @Timed
    public ResponseEntity<MemberDTO> createMember(@Valid @RequestBody MemberDTO memberDTO) throws URISyntaxException {
        log.debug("REST request to save Member : {}", memberDTO);
        if (memberDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new member cannot already have an ID")).body(null);
        }
        MemberDTO result = memberService.save(memberDTO);
        return ResponseEntity.created(new URI("/api/members/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /members : Updates an existing member.
     *
     * @param memberDTO the memberDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated memberDTO,
     * or with status 400 (Bad Request) if the memberDTO is not valid,
     * or with status 500 (Internal Server Error) if the memberDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/members")
    @Timed
    public ResponseEntity<MemberDTO> updateMember(@Valid @RequestBody MemberDTO memberDTO) throws URISyntaxException {
        log.debug("REST request to update Member : {}", memberDTO);
        if (memberDTO.getId() == null) {
            return createMember(memberDTO);
        }
        MemberDTO result = memberService.save(memberDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, memberDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /members : get all the members.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of members in body
     */
    @GetMapping("/members")
    @Timed
    public List<MemberDTO> getAllMembers() {
        log.debug("REST request to get all Members");
        return memberService.findAll();
    }

    /**
     * GET  /members/:id : get the "id" member.
     *
     * @param id the id of the memberDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the memberDTO, or with status 404 (Not Found)
     */
    @GetMapping("/members/{id}")
    @Timed
    public ResponseEntity<MemberDTO> getMember(@PathVariable Long id) {
        log.debug("REST request to get Member : {}", id);
        MemberDTO memberDTO = memberService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(memberDTO));
    }

    /**
     * DELETE  /members/:id : delete the "id" member.
     *
     * @param id the id of the memberDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/members/{id}")
    @Timed
    public ResponseEntity<Void> deleteMember(@PathVariable Long id) {
        log.debug("REST request to delete Member : {}", id);
        memberService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
