/**
 * 
 */
package com.bookmarks.models.rest;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import com.bookmarks.models.Bookmark;

/**
 * @author charlie
 *
 */
public class RestBookmarkTest {
	
	private Bookmark bookmark;
	private RestBookmark restBookmark;

	/**
	 * @throws java.lang.Exception
	 */
	@Before
	public void setUp() throws Exception {
		this.bookmark = new Bookmark();
		this.bookmark.setId(1L);
		this.restBookmark = new RestBookmark(this.bookmark); 
	}

	/**
	 * Test method for {@link com.bookmarks.models.RestBookmark#equals(java.lang.Object)}.
	 */
	@Test
	public final void testEqualsObject_againstNull() {
		assertFalse(restBookmark.equals(null));
	}
	
	/**
	 * Test method for {@link com.bookmarks.models.RestBookmark#equals(java.lang.Object)}.
	 */
	@Test
	public final void testEqualsObject_againstDifferntType() {
		assertFalse(restBookmark.equals(new Object()));
	}
	
	/**
	 * Test method for {@link com.bookmarks.models.RestBookmark#equals(java.lang.Object)}.
	 */
	@Test
	public final void testEqualsObject_againstSameBookmark() {
		RestBookmark same = new RestBookmark(this.bookmark);
		assertTrue(restBookmark.equals(same));
	}
	
	/**
	 * Test method for {@link com.bookmarks.models.RestBookmark#equals(java.lang.Object)}.
	 */
	@Test
	public final void testEqualsObject_againstSameId() {
		RestBookmark sameId = new RestBookmark();
		sameId.setId(this.restBookmark.getId());
		assertTrue(restBookmark.equals(sameId));
	}
	
	/**
	 * Test method for {@link com.bookmarks.models.RestBookmark#equals(java.lang.Object)}.
	 */
	@Test
	public final void testEqualsObject_againstDifferntId() {
		RestBookmark diffId = new RestBookmark();
		diffId.setId(restBookmark.getId() + 1);
		assertFalse(restBookmark.equals(diffId));
	}
}
