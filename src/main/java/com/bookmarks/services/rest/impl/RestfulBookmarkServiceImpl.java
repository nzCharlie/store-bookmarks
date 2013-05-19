/**
 * 
 */
package com.bookmarks.services.rest.impl;

import java.util.Arrays;
import java.util.List;

import javax.jws.WebService;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Service;

import com.bookmarks.models.Bookmark;
import com.bookmarks.models.rest.RestBookmark;
import com.bookmarks.services.BookmarkService;
import com.bookmarks.services.rest.RestfulBookmarkService;
import com.bookmarks.utils.CurrentTimeProvider;

/**
 * @author charlie
 *
 */
@Service
@WebService(endpointInterface = "com.bookmarks.services.rest.RestfulBookmarkService")
@Path("/bookmarks")
public class RestfulBookmarkServiceImpl implements RestfulBookmarkService {

	private BookmarkService bookmarkService;
	private ConversionService conversionService;
	private CurrentTimeProvider currentTimeProvider;

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
	 * @param currentTimeProvider the currentTimeProvider to set
	 */
	@Autowired
	public void setCurrentTimeProvider(CurrentTimeProvider currentTimeProvider) {
		this.currentTimeProvider = currentTimeProvider;
	}

	public List<RestBookmark> getAllBookmarks() {
		List<Bookmark> allBookmarks = this.bookmarkService.getAllBookmarks();
		return Arrays.asList(this.conversionService.convert(allBookmarks, RestBookmark[].class));
	}
	
	/**
	 * @param id
	 * @return
	 */
	public RestBookmark getBookmark(Long id) {
		Bookmark bookmark = this.bookmarkService.getBookmark(id);
		return this.conversionService.convert(bookmark, RestBookmark.class);
	}

	/**
	 * @param restBookmark
	 * @return
	 */
	public Response updateBookmark(RestBookmark restBookmark) {
		return saveOrUpdateBookmarks(restBookmark);
	}
	
	/**
	 * @param restBookmark
	 * @return
	 */
	public Response saveBookmark(RestBookmark restBookmark) {
		restBookmark.setId(null); // should not specify id
		restBookmark.setCreated(this.currentTimeProvider.getCurrentTime()); // should be set to now
		
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

	public void deleteBookmark(Long id) {
		this.bookmarkService.deleteBookmark(id);
	}
	
}
