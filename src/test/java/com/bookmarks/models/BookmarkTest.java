/**
 * 
 */
package com.bookmarks.models;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

/**
 * @author charlie
 *
 */
public class BookmarkTest {

	private Bookmark bookmark; 
	
	@Before
	public void setup() {
		bookmark = new Bookmark();
		bookmark.setId(1L);
	}
	
	/**
	 * Test method for {@link com.bookmarks.models.Bookmark#equals(java.lang.Object)}.
	 */
	@Test
	public final void testEqualsObject_againstNull() {
		assertFalse(bookmark.equals(null));
	}
	
	/**
	 * Test method for {@link com.bookmarks.models.Bookmark#equals(java.lang.Object)}.
	 */
	@Test
	public final void testEqualsObject_againstDifferntType() {
		assertFalse(bookmark.equals(new Object()));
	}
	
	/**
	 * Test method for {@link com.bookmarks.models.Bookmark#equals(java.lang.Object)}.
	 */
	@Test
	public final void testEqualsObject_againstSameId() {
		Bookmark sameId = new Bookmark();
		sameId.setId(bookmark.getId());
		assertTrue(bookmark.equals(sameId));
	}
	
	/**
	 * Test method for {@link com.bookmarks.models.Bookmark#equals(java.lang.Object)}.
	 */
	@Test
	public final void testEqualsObject_againstDifferntId() {
		Bookmark diffId = new Bookmark();
		diffId.setId(bookmark.getId() + 1);
		assertFalse(bookmark.equals(diffId));
	}
}
