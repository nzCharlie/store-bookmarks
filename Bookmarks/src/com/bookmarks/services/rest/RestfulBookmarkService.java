/**
 * 
 */
package com.bookmarks.services.rest;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
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

	@GET
	@Path("list")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<RestBookmark> getAllBookmarks() {
		List<Bookmark> allBookmarks = this.bookmarkService.getAllBookmarks();
		return Arrays.asList(this.conversionService.convert(allBookmarks, RestBookmark[].class));
	}
	
	/**
	 * @param id
	 * @return
	 */
	@GET
	@Path("{id}")
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
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Response updateBookmark(RestBookmark restBookmark) {
		return saveOrUpdateBookmarks(restBookmark);
	}
	
	/**
	 * @param restBookmark
	 * @return
	 */
	@PUT
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
	@Path("{id}")
	public void deleteBookmark(@PathParam("id") Long id) {
		this.bookmarkService.deleteBookmark(id);
	}
	
}
