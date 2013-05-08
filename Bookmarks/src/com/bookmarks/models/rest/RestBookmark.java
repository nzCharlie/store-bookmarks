/**
 * 
 */
package com.bookmarks.models.rest;

import java.util.Date;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import com.bookmarks.models.Bookmark;

/**
 * @author charlie
 *
 */
@XmlRootElement(name="bookmark")
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
	@XmlElement
	public Long getId() {
		return this.entity.getId();
	}
 
	/**
	 * @return the created
	 */
	@XmlElement
	public Date getCreated() {
		return this.entity.getCreated();
	}
 
	/**
	 * @return the url
	 */
	@XmlElement
	public String getUrl() {
		return this.entity.getUrl();
	}
 
	/**
	 * @return the user
	 */
	@XmlElement
	public String getUser() {
		return this.entity.getUser();
	}
 
	/**
	 * @return the description
	 */
	@XmlElement
	public String getDescription() {
		return this.entity.getDescription();
	}
	
}
