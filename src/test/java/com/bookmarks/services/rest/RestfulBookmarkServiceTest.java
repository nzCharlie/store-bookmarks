/**
 * 
 */
package com.bookmarks.services.rest;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.ws.rs.core.Response;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.springframework.core.convert.ConversionService;

import com.bookmarks.models.Bookmark;
import com.bookmarks.models.rest.RestBookmark;
import com.bookmarks.services.BookmarkService;
import com.bookmarks.services.rest.impl.RestfulBookmarkServiceImpl;
import com.bookmarks.utils.CurrentTimeProvider;

/**
 * @author charlie
 *
 */
public class RestfulBookmarkServiceTest {

	private RestfulBookmarkServiceImpl service;
	
	private @Mock BookmarkService bookmarkService;
	private @Mock ConversionService conversionService;
	private @Mock CurrentTimeProvider currentTimeProvider;
	
	/**
	 * @throws java.lang.Exception
	 */
	@Before
	public void setUp() throws Exception {
		MockitoAnnotations.initMocks(this);
		
		this.service = new RestfulBookmarkServiceImpl();
		this.service.setBookmarkService(bookmarkService);
		this.service.setConversionService(conversionService);
		this.service.setCurrentTimeProvider(currentTimeProvider);
		
		when(this.currentTimeProvider.getCurrentTime()).thenReturn(new Date(0));
	}

	/**
	 * Test method for {@link com.bookmarks.services.rest.impl.RestfulBookmarkServiceImpl#getAllBookmarks()}.
	 */
	@Test
	public final void testGetAllBookmarks() {
		List<Bookmark> bookmarks = new ArrayList<Bookmark>();
		
		Bookmark bookmark1 = new Bookmark();
		bookmark1.setId(1L);
		bookmarks.add(bookmark1);
		
		List<RestBookmark> expected = Arrays.asList(new RestBookmark(bookmark1));
		
		when(this.bookmarkService.getAllBookmarks()).thenReturn(bookmarks);
		when(this.conversionService.convert(same(bookmarks), same(RestBookmark[].class))).thenReturn(new RestBookmark[] {new RestBookmark(bookmark1)});
		
		List<RestBookmark> actual = this.service.getAllBookmarks();
		assertEquals(expected, actual);
	}

	/**
	 * Test method for {@link com.bookmarks.services.rest.impl.RestfulBookmarkServiceImpl#getBookmark(java.lang.Long)}.
	 */
	@Test
	public final void testGetBookmark() {
		long id = 1L;
		Bookmark bookmark = new Bookmark();
		bookmark.setId(id);
		
		when(this.bookmarkService.getBookmark(id)).thenReturn(bookmark);
		when(this.conversionService.convert(same(bookmark), same(RestBookmark.class))).thenReturn(new RestBookmark(bookmark));
		
		RestBookmark actual = this.service.getBookmark(id);
		assertEquals(new RestBookmark(bookmark), actual);
		assertSame(bookmark, actual.getEntity());
	}

	/**
	 * Test method for {@link com.bookmarks.services.rest.impl.RestfulBookmarkServiceImpl#updateBookmark(com.bookmarks.models.rest.RestBookmark)}.
	 */
	@Test
	public final void testUpdateBookmark() {
		long id = 2L;
		Bookmark bookmark = new Bookmark();
		bookmark.setId(id);
		RestBookmark restBookmark = new RestBookmark(bookmark);
		
		when(this.conversionService.convert(restBookmark, Bookmark.class)).thenReturn(bookmark);
		
		this.service.updateBookmark(restBookmark);
		verify(this.bookmarkService).saveOrUpdateBookmark(same(bookmark));
	}

	/**
	 * Test method for {@link com.bookmarks.services.rest.impl.RestfulBookmarkServiceImpl#saveBookmark(com.bookmarks.models.rest.RestBookmark)}.
	 */
	@Test
	public final void testSaveBookmark() {
		final long savedId = 2L;
		Bookmark bookmark1 = new Bookmark();
		bookmark1.setId(1000L);
		RestBookmark restBookmarkToSave = new RestBookmark(bookmark1);
				
		doAnswer(new Answer<Object>() {
			@Override
			public Object answer(InvocationOnMock invocation) throws Throwable {
				Bookmark bookmark = (Bookmark) invocation.getArguments()[0];
				assertNull(bookmark.getId()); // ensure id is clear for the bookmark to be created.
				bookmark.setId(savedId);
				
				return null;
			}
		}).when(this.bookmarkService).saveOrUpdateBookmark(same(bookmark1));
		when(this.conversionService.convert(same(restBookmarkToSave), same(Bookmark.class))).thenReturn(bookmark1);

		Bookmark expectedBookmark = new Bookmark();
		expectedBookmark.setId(savedId);
		RestBookmark expectedRestBookmark = new RestBookmark(expectedBookmark);
		
		Response actualResponse = this.service.saveBookmark(restBookmarkToSave);
		
		assertEquals(expectedRestBookmark, actualResponse.getEntity());
		assertEquals(currentTimeProvider.getCurrentTime(), ((RestBookmark) actualResponse.getEntity()).getCreated());
		assertEquals(200, actualResponse.getStatus());
	}

	/**
	 * Test method for {@link com.bookmarks.services.rest.impl.RestfulBookmarkServiceImpl#deleteBookmark(java.lang.Long)}.
	 */
	@Test
	public final void testDeleteBookmark() {
		long id = 1L;
		
		this.service.deleteBookmark(id);
		
		verify(this.bookmarkService).deleteBookmark(id);
	}

}
