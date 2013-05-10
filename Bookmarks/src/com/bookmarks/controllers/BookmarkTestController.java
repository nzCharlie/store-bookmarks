/**
 * 
 */
package com.bookmarks.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author charlie
 *
 */
@Controller
@RequestMapping({"/hello", "/"})
public class BookmarkTestController {

	/**
	 * @return
	 */
	@RequestMapping(method=RequestMethod.GET)
	public String index() {
		return "redirect:/hello/word";
	}
	
	@RequestMapping(value="/{name}", method=RequestMethod.GET)
	public String hello(@PathVariable String name, ModelMap model) {
		model.addAttribute("name", name);
		return "hello";
	}
	
}
