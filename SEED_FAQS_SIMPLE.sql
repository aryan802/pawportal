-- Seed FAQs - Simple Version (One INSERT per category)
-- Run this if the multi-row INSERT causes issues

USE pawportal;

-- Get System Admin user ID
SET @admin_id = (SELECT id FROM users WHERE role = 'System Admin' LIMIT 1);
SELECT CONCAT('Using admin_id: ', IFNULL(@admin_id, 'NULL - Please set manually')) as info;

-- If @admin_id is NULL, set it manually:
-- SET @admin_id = 1;

-- Adoption FAQs
INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How do I adopt a pet?', 'To adopt a pet, browse our Pet Listings page, find a pet you like, and click "Apply for Adoption". Fill out the adoption application form with your details. Our team will review your application and contact you within 2-3 business days.', 'Adoption', '["adopt", "adoption", "how to adopt", "pet adoption", "adoption process", "apply", "application"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('What are the adoption requirements?', 'To adopt a pet, you must be at least 18 years old, have a valid ID, and demonstrate that you can provide a safe and loving home. Some pets may have specific requirements which will be listed on their profile.', 'Adoption', '["requirements", "adoption requirements", "eligibility", "qualify", "criteria", "what do I need"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How long does the adoption process take?', 'The adoption process typically takes 2-5 business days. After submitting your application, our team reviews it and may contact you for additional information or schedule a home visit. Once approved, you can complete the adoption and take your new pet home!', 'Adoption', '["how long", "time", "duration", "adoption process", "waiting time", "processing"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Can I meet the pet before adopting?', 'Yes! We encourage meet-and-greets. You can schedule a visit by contacting the shelter or attending one of our adoption events. Check the Events page for upcoming adoption events near you.', 'Adoption', '["meet", "visit", "see pet", "meet and greet", "before adopt", "schedule visit"]', @admin_id, TRUE);

-- Health FAQs
INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How often should I take my pet to the vet?', 'Puppies and kittens should visit the vet every 3-4 weeks until 16 weeks old for vaccinations. Adult pets should have annual checkups. Senior pets (7+ years) should visit every 6 months. Always consult your vet for a personalized schedule.', 'Health', '["vet", "veterinarian", "checkup", "how often", "vet visit", "health check", "examination"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('What vaccinations does my pet need?', 'Dogs typically need: DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza), Rabies, and Bordetella. Cats need: FVRCP (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia) and Rabies. Your vet can provide a vaccination schedule based on your pet''s age and lifestyle.', 'Health', '["vaccination", "vaccine", "shots", "immunization", "vaccines needed", "what vaccines"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How do I update my pet''s health records?', 'Go to "Health Dashboard" or "My Pets", select your pet, and click "Add Health Record". Enter details like vaccination date, checkup notes, medications, or treatments. You can also upload documents or receipts.', 'Health', '["health record", "medical record", "update health", "add record", "vet record", "health history"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How do I set up care reminders?', 'Go to "Health Dashboard" or "My Pets", select your pet, and click "Add Reminder". Choose the reminder type (feeding, medication, vet visit, etc.), set the frequency, and the next reminder date. You''ll receive notifications when reminders are due.', 'Health', '["reminder", "care reminder", "set reminder", "notification", "alarm", "schedule"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Can I get notifications for pet care?', 'Yes! PawPortal sends real-time notifications for care reminders, upcoming vet appointments, vaccination due dates, and more. Make sure notifications are enabled in your browser and check the notification bell icon in the top-right corner.', 'Health', '["notification", "reminder notification", "alerts", "notify", "care alerts"]', @admin_id, TRUE);

-- General FAQs
INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How do I add my pet to PawPortal?', 'Go to "My Pets" in the navigation menu, click "Add Pet", and fill out the form with your pet''s information including name, breed, age, and upload photos. You can also add health records and care reminders for better pet management.', 'General', '["add pet", "register pet", "new pet", "pet registration", "how to add", "create pet profile"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('What is PawPortal?', 'PawPortal is a comprehensive pet adoption and healthcare management platform. We help connect pets with loving families, manage pet health records, organize community events, and provide resources for pet owners.', 'General', '["what is", "about", "pawportal", "platform", "what does", "explain"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How do I contact support?', 'You can contact us through the contact form on our website, email us at support@pawportal.com, or call us at (555) 123-4567. Our support team is available Monday-Friday, 9 AM - 5 PM.', 'General', '["contact", "support", "help", "customer service", "contact us", "get help", "assistance"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Is PawPortal free to use?', 'Yes! PawPortal is completely free for users. Creating an account, browsing pets, posting in forums, and attending events are all free. There are no subscription fees or hidden costs.', 'General', '["free", "cost", "price", "fee", "subscription", "payment", "money"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How do I report inappropriate content?', 'If you see inappropriate content, click the "Report" button on the post or profile. Our moderators review all reports and take appropriate action. You can also contact support directly for urgent issues.', 'General', '["report", "inappropriate", "abuse", "violation", "report content", "flag"]', @admin_id, TRUE);

-- Events FAQs
INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How do I register for an event?', 'Browse the Events page to see upcoming events. Click on an event you''re interested in and fill out the registration form with your name, email, and phone number. You''ll receive a confirmation once registered.', 'Events', '["event", "register", "event registration", "sign up event", "join event", "attend"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Are events free to attend?', 'Most of our events are free! Some special events like fundraisers may have a registration fee, which will be clearly stated on the event page. Adoption events are always free.', 'Events', '["event cost", "free", "fee", "price", "cost", "ticket", "event fee"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Can I bring my pet to events?', 'It depends on the event type. Adoption events and meetups usually welcome pets! Training sessions and health checks are designed for pets. Check the event description for specific guidelines. Always ensure your pet is vaccinated and well-behaved.', 'Events', '["bring pet", "pet allowed", "can I bring", "pet friendly", "event with pet"]', @admin_id, TRUE);

-- Lost & Found FAQs
INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('My pet is lost. What should I do?', 'Immediately post on our Lost & Found page with your pet''s photo, description, RFID number (if available), and last seen location. Share the post on social media and contact local shelters. If your pet has an RFID tag, we can help match it with found pets.', 'Lost & Found', '["lost pet", "pet missing", "lost", "help find", "missing pet", "pet lost"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How does RFID matching work?', 'If your lost pet has an RFID tag (format: RFID-12345), enter it when posting. Our system automatically matches it with any found pets that have the same RFID number. If a match is found, you''ll be notified immediately with contact information.', 'Lost & Found', '["RFID", "rfid matching", "rfid tag", "microchip", "match", "pet matching"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('I found a pet. What should I do?', 'Post on our Lost & Found page with the pet''s photo, description, and location where you found them. If the pet has an RFID tag, enter it in the post. Check for any matching lost posts. You can also contact local shelters or animal control.', 'Lost & Found', '["found pet", "found", "what to do", "found animal", "stray pet"]', @admin_id, TRUE);

-- Account FAQs
INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How do I update my profile?', 'Click on your name in the top-right corner, select your profile, and click "Edit Profile". You can update your name, email, phone number, address, and profile picture.', 'Account', '["profile", "update profile", "edit profile", "change profile", "account settings"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How do I change my password?', 'Go to your profile settings and click "Change Password". Enter your current password and your new password twice. Make sure your new password is at least 8 characters long and includes letters and numbers.', 'Account', '["password", "change password", "reset password", "forgot password", "update password"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Can I delete my account?', 'Yes, you can delete your account from your profile settings. Please note that this action is permanent and will remove all your data including pets, applications, and posts. Contact support if you need assistance.', 'Account', '["delete account", "remove account", "close account", "account deletion"]', @admin_id, TRUE);

-- Forum FAQs
INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How do I post in the forums?', 'Go to "Community Forums", click "Start New Thread", choose a category, enter a title and your message, then click "Post Thread". You can reply to existing threads by clicking on them and posting a reply.', 'Forum', '["forum", "post", "thread", "create post", "start thread", "new post", "discussion"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Can I delete my forum posts?', 'Yes, you can delete your own posts and threads. Click on the post or thread you want to delete and use the delete option. Moderators can also remove posts that violate community guidelines.', 'Forum', '["delete post", "remove post", "delete thread", "forum delete"]', @admin_id, TRUE);

-- Verify
SELECT COUNT(*) as total_faqs FROM faqs;
SELECT category, COUNT(*) as count FROM faqs GROUP BY category;

