package com.utm.prj.model.friends;

import lombok.Data;
import org.hibernate.annotations.Type;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Data
@Entity
@Table(name = "friends")
public class Friends implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String lastName;
    private String age;
    private String phone;
    private String address;
    private String photos;

    public Friends() {
    }

    public Friends(String name, String lastName, String age, String address, String phone, String photos) {
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.address = address;
        this.phone = phone;
        this.photos = photos;
    }
}
