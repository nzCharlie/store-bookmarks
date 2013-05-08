/**
 * 
 */
package com.bookmarks.services.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.bookmarks.models.Bookmark;
import com.bookmarks.models.rest.RestBookmark;
import com.bookmarks.services.BookmarkService;

/**
 * @author charlie
 *
 */
@Service
@Path("/bookmarks")
public class RestfulBookmarkService {

	private BookmarkService bookmarkService;
	
	private ConversionService conversionService;

	/**
	 * @param bookmarkService the bookmarkService to set
	 */
	@Autowired
	public void setBookmarkService(BookmarkService bookmarkService) {
		this.bookmarkService = bookmarkService;
	}
		
	/**
	 * @param conversionService the conversionService to set
	 */
	@Autowired
	public void setConversionService(ConversionService conversionService) {
		this.conversionService = conversionService;
	}

	/**
	 * @param id
	 * @return
	 */
	@GET
	@Path("get/{id}")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public RestBookmark getBookmark(@PathParam("id") Long id) {
		Bookmark bookmark = this.bookmarkService.getBookmark(id);
		return this.conversionService.convert(bookmark, RestBookmark.class);
	}
	
}
