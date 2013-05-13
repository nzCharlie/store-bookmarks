/**
 * 
 */
package com.bookmarks.services.impl;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.bookmarks.dao.BookmarkDao;
import com.bookmarks.models.Bookmark;
import com.bookmarks.services.BookmarkService;
import com.bookmarks.utils.CurrentTimeProvider;

/**
 * @author charlie
 *
 */
public class BookmarkServiceImplTest {

	private Bookmark bookmark;
	private BookmarkService service;
	private @Mock BookmarkDao daoMock;
	private @Mock CurrentTimeProvider currentTimeProvider;
	
	/**
	 * @throws java.lang.Exception
	 */
	@Before
	public void setUp() throws Exception {
		MockitoAnnotations.initMocks(this);
		
		this.service = new BookmarkServiceImpl();
		((BookmarkServiceImpl) this.service).setDao(daoMock);
		((BookmarkServiceImpl) this.service).setCurrentTimeProvider(currentTimeProvider);
		
		this.bookmark = new Bookmark();
		when(this.currentTimeProvider.getCurrentTime()).thenReturn(new Date(0));
	}

	/**
	 * Test method for {@link com.bookmarks.services.impl.BookmarkServiceImpl#saveOrUpdateBookmark(com.bookmarks.models.Bookmark)}.
	 */
	@Test
	public final void testSaveOrUpdateBookmark() {
		this.service.saveOrUpdateBookmark(bookmark);
		
		verify(this.daoMock).saveOrUpdateBookmark(same(bookmark));
		assertEquals(currentTimeProvider.getCurrentTime(), bookmark.getUpdated());
	}

	/**
	 * Test method for {@link com.bookmarks.services.impl.BookmarkServiceImpl#getBookmark(java.lang.Long)}.
	 */
	@Test
	public final void testGetBookmark() {
		when(this.daoMock.getBookmark(this.bookmark.getId())).thenReturn(bookmark);
		
		Bookmark returned = this.service.getBookmark(this.bookmark.getId());
		
		assertSame(bookmark, returned);
	}

	/**
	 * Test method for {@link com.bookmarks.services.impl.BookmarkServiceImpl#deleteBookmark(java.lang.Long)}.
	 */
	@Test
	public final void testDeleteBookmark() {
		long id = 1L;
		
		this.service.deleteBookmark(id);
		
		verify(this.daoMock).delete1Bookmark(id);
	}

	/**
	 * Test method for {@link com.bookmarks.services.impl.BookmarkServiceImpl#getAllBookmarks()}.
	 */
	@Test
	public final void testGetAllBookmarks() {
		List<Bookmark> bookmarks = Arrays.asList(bookmark);
		when(this.daoMock.getAllBookmarks()).thenReturn(bookmarks);
		
		List<Bookmark> returned = this.service.getAllBookmarks();
		
		assertSame(bookmarks, returned);
	}

}
