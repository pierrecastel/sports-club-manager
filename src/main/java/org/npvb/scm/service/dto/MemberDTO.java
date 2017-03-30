package org.npvb.scm.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the Member entity.
 */
public class MemberDTO implements Serializable {

    private Long id;

    @Size(min = 10, max = 20)
    private String phoneNumber;

    @Size(min = 10, max = 20)
    private String mobilePhoneNumber;

    @Lob
    private byte[] photo;
    private String photoContentType;

    private LocalDate birthDate;

    private String job;

    private Boolean showInfo;

    private Long addressId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    public String getMobilePhoneNumber() {
        return mobilePhoneNumber;
    }

    public void setMobilePhoneNumber(String mobilePhoneNumber) {
        this.mobilePhoneNumber = mobilePhoneNumber;
    }
    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return photoContentType;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }
    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }
    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }
    public Boolean getShowInfo() {
        return showInfo;
    }

    public void setShowInfo(Boolean showInfo) {
        this.showInfo = showInfo;
    }

    public Long getAddressId() {
        return addressId;
    }

    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MemberDTO memberDTO = (MemberDTO) o;

        if ( ! Objects.equals(id, memberDTO.id)) { return false; }

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "MemberDTO{" +
            "id=" + id +
            ", phoneNumber='" + phoneNumber + "'" +
            ", mobilePhoneNumber='" + mobilePhoneNumber + "'" +
            ", photo='" + photo + "'" +
            ", birthDate='" + birthDate + "'" +
            ", job='" + job + "'" +
            ", showInfo='" + showInfo + "'" +
            '}';
    }
}
