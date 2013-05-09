/**
 * 
 */
package com.bookmarks.services.rest;

import java.net.URI;
import java.util.Date;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.core.UriInfo;

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
	
	private UriInfo uriInfo;
	
	/**
	 * @param uriInfo the uriInfo to set
	 */
	@Context
	public void setUriInfo(UriInfo uriInfo) {
		this.uriInfo = uriInfo;
	}

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

	/**
	 * @param restBookmark
	 * @return
	 */
	@POST
	@Path("update")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Response updateBookmark(RestBookmark restBookmark) {
		return saveBookmark(restBookmark);
	}
	
	/**
	 * @param restBookmark
	 * @return
	 */
	@PUT
	@Path("save")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Response saveBookmark(RestBookmark restBookmark) {
		restBookmark.setId(null); // should not specify id
		restBookmark.setCreated(new Date()); // should be set to now
		
		return saveOrUpdateBookmarks(restBookmark);
	}

	/**
	 * 
	 * @param restBookmark
	 * @return
	 */
	private Response saveOrUpdateBookmarks(RestBookmark restBookmark) {
		Bookmark bookmark = this.conversionService.convert(restBookmark, Bookmark.class);
		this.bookmarkService.saveOrUpdateBookmark(bookmark);
		return Response.ok().entity(restBookmark).build();
	}
	
	/**
	 * @param id
	 */
	@DELETE
	@Path("delete/{id}")
	public void deleteBookmark(@PathParam("id") Long id) {
		this.bookmarkService.deleteBookmark(id);
	}
	
}
