/**
 * 
 */
package com.bookmarks.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author charlie
 *
 */
@Controller
@RequestMapping("/")
public class HomeController {

	/**
	 * @return
	 */
	@RequestMapping(method=RequestMethod.GET)
	public String index() {
		return "index";
	}
	
}
