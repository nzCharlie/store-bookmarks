/**
 * 
 */
package com.bookmarks.controllers;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bookmarks.models.Bookmark;
import com.bookmarks.services.BookmarkService;

/**
 * @author charlie
 *
 */
@Controller
@RequestMapping({"/hello", "/"})
public class BookmarkTestController {
	
	private BookmarkService bookmarkService;
		
	/**
	 * @param bookmarkService the bookmarkService to set
	 */
	@Autowired
	public void setBookmarkService(BookmarkService bookmarkService) {
		this.bookmarkService = bookmarkService;
	}

	@RequestMapping(method=RequestMethod.GET)
	public String index() {
		return "redirect:/hello/word";
	}
	
	@RequestMapping(value="/{name}", method=RequestMethod.GET)
	public String hello(@PathVariable String name, ModelMap model) {
		model.addAttribute("name", name);
		return "hello";
	}
	
	@ResponseBody
	@RequestMapping(value="/save", method=RequestMethod.GET)
	public String saveABookmark() {
		Bookmark bookmark = new Bookmark();
		bookmark.setCreated(new Date());
		bookmark.setDescription("test");
		bookmark.setUrl("http://www.test.com");
		bookmark.setUser("me");
		
		this.bookmarkService.saveOrUpdateBookmark(bookmark);
		return bookmark.getId() + "";
	}

	@ResponseBody
	@RequestMapping(value="/get/{id}", method=RequestMethod.GET)
	public String loadABookmark(@PathVariable Long id) {
		Bookmark bookmark = this.bookmarkService.getBookmark(1L);
		
		return bookmark.getUrl();
	}
}
