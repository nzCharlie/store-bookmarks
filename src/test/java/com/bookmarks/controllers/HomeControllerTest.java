/**
 * 
 */
package com.bookmarks.controllers;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

/**
 * @author charlie
 *
 */
public class HomeControllerTest {

	private HomeController controller;
		
	/**
	 * @throws java.lang.Exception
	 */
	@Before
	public void setUp() throws Exception {
		this.controller = new HomeController();
	}

	/**
	 * Test method for {@link com.bookmarks.controllers.HomeController#index()}.
	 */
	@Test
	public final void testIndex() {
		assertEquals("index", this.controller.index());
	}

}
