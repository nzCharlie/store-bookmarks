/**
 * 
 */
package com.bookmarks.models.rest;

import java.util.Date;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import com.bookmarks.models.Bookmark;

/**
 * @author charlie
 *
 */
@XmlRootElement(name="bookmark")
@XmlAccessorType(XmlAccessType.PROPERTY)
public class RestBookmark {
	private Bookmark entity;
	
	/**
	 * 
	 */
	public RestBookmark() {
		this.entity = new Bookmark();
	}
	
	/**
	 * @param entity
	 */
	public RestBookmark(Bookmark entity) {
		if (entity == null) {
			throw new IllegalArgumentException("entity cannot be null");
		}
		
		this.entity = entity;
	}

	/**
	 * @return the id
	 */
	public Long getId() {
		return this.entity.getId();
	}
	/**
	 * @param id the id to set
	 */
	public void setId(Long id) {
		this.entity.setId(id);
	}
	/**
	 * @return the name
	 */
	public String getName() {
		return this.entity.getName();
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.entity.setName(name);
	}
	/**
	 * @return the created
	 */
	public Date getCreated() {
		return this.entity.getCreated();
	}
	/**
	 * @param created the created to set
	 */
	public void setCreated(Date created) {
		this.entity.setCreated(created);
	}
	/**
	 * @return the url
	 */
	public String getUrl() {
		return this.entity.getUrl();
	}
	/**
	 * @param url the url to set
	 */
	public void setUrl(String url) {
		this.entity.setUrl(url);
	}
	/**
	 * @return the description
	 */
	public String getDescription() {
		return this.entity.getDescription();
	}
	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.entity.setDescription(description);
	}
	/**
	 * @return the update
	 */
	public Date getUpdated() {
		return this.entity.getUpdated();
	}
	/**
	 * @param update the update to set
	 */
	public void setUpdated(Date updated) {
		this.entity.setUpdated(updated);
	}
	
	/**
	 * @return
	 */
	@XmlTransient
	public Bookmark getEntity() {
		return this.entity;
	}
}
