package com.backend.usersTables.admin;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("admin")
@RequiredArgsConstructor
@Tag(name = "admin")
public class AdminController {

}
