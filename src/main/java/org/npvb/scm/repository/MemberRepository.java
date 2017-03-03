package org.npvb.scm.repository;

import org.npvb.scm.domain.Member;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Member entity.
 */
@SuppressWarnings("unused")
public interface MemberRepository extends JpaRepository<Member,Long> {

}
