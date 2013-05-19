/**
 * 
 */
package com.bookmarks.services.rest;

import java.util.List;

import javax.jws.WebService;
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

import com.bookmarks.models.rest.RestBookmark;

/**
 * @author charlie
 *
 */
@WebService
public interface RestfulBookmarkService {
	
	@GET
	@Path("list")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<RestBookmark> getAllBookmarks();
	
	/**
	 * @param id
	 * @return
	 */
	@GET
	@Path("{id}")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public RestBookmark getBookmark(@PathParam("id") Long id);

	/**
	 * @param restBookmark
	 * @return
	 */
	@POST
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Response updateBookmark(RestBookmark restBookmark);
	
	/**
	 * @param restBookmark
	 * @return
	 */
	@PUT
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Response saveBookmark(RestBookmark restBookmark);

	/**
	 * @param id
	 */
	@DELETE
	@Path("{id}")
	public void deleteBookmark(@PathParam("id") Long id);
}
