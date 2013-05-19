/**
 * 
 */
package com.bookmarks.models;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.apache.commons.lang3.ObjectUtils;
import org.hibernate.annotations.Proxy;

/**
 * @author charlie
 *
 */
@Entity
@Proxy(lazy=false)
@Table(name="bookmark")
public class Bookmark {

	private Long id;
	
	private String name;
	
	private String url;
		
	private String description;
	
	private Date created;
	
	private Date updated;
	
	/**
	 * @return the id
	 */
	@Id
	@SequenceGenerator(name="bookmark_pk_sequence", sequenceName="bookmark_pk_sequence")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="bookmark_pk_sequence")
	@Column(name="id", unique=true, nullable=false)
	public Long getId() {
		return id;
	}
	/**
	 * @return the name
	 */
	@Column(name= "name", nullable=false, length=255)
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}
	/**
	 * @return the created
	 */
	@Column(name= "created", nullable=false)
	public Date getCreated() {
		return created;
	}
	/**
	 * @param created the created to set
	 */
	public void setCreated(Date created) {
		this.created = created;
	}
	/**
	 * @return the url
	 */
	@Column(name= "url", nullable=false, length=255)
	public String getUrl() {
		return url;
	}
	/**
	 * @param url the url to set
	 */
	public void setUrl(String url) {
		this.url = url;
	}
	/**
	 * @return the description
	 */
	@Column(name= "description", nullable=true, length=255)
	public String getDescription() {
		return description;
	}
	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}
	/**
	 * @return the update
	 */
	@Column(name= "updated", nullable=false)
	public Date getUpdated() {
		return updated;
	}
	/**
	 * @param update the update to set
	 */
	public void setUpdated(Date updated) {
		this.updated = updated;
	}
	
	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}
		
		if (obj instanceof Bookmark) {
			Bookmark other = (Bookmark) obj;
			return ObjectUtils.equals(this.getId(), other.getId());
		}
		return false;
	}
}
