package com.backend.email;

import com.backend.handler.EmailNotSentException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.HashMap;
import java.util.Map;

import static java.nio.charset.StandardCharsets.UTF_8;

@Service
@RequiredArgsConstructor
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    @Async
    public void sendEmail(
            String to,
            String username,
            EmailTemplateName emailTemplateName,
            String activationCode,
            String subject
    ) throws MessagingException {
        String templateName = (emailTemplateName == null) ? "confirm-email" : emailTemplateName.getName();

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(
                mimeMessage,
                MimeMessageHelper.MULTIPART_MODE_MIXED,
                UTF_8.name()
        );

        Map<String, Object> properties = new HashMap<>();
        properties.put("username", username);
        properties.put("activation_code", activationCode);
        properties.put("title", subject);

        Context context = new Context();
        context.setVariables(properties);

        String template = templateEngine.process(templateName, context);

        try {
            helper.setFrom("waelbalhoudi@gmail.com");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(template, true);

            mailSender.send(mimeMessage);
            logger.info("Email sent successfully to {}", to);
        } catch (MailException | MessagingException ex) {
            logger.error("Failed to send email to {}", to, ex);
            throw new EmailNotSentException("Failed to send email to " + to, ex);
        }
    }
}