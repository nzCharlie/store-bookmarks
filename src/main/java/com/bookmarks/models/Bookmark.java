/**
 * 
 */
package com.bookmarks.models;


import java.util.Date;

import org.apache.commons.lang3.ObjectUtils;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;

/**
 * @author charlie
 *
 */
@Entity(name="Bookmark")
public class Bookmark {

	@Id
	private Long id;
	
	private String name;
	
	private String url;
		
	private String description;
	
	private Date created;
	
	private Date updated;
	
	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}
	/**
	 * @return the name
	 */
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
