-- Seed Additional FAQs for PawPortal Chatbot (50 Questions)
-- Run this in TiDB Chat2Query after running SEED_FAQS_SIMPLE.sql

USE pawportal;

-- Get System Admin user ID
SET @admin_id = (SELECT id FROM users WHERE role = 'System Admin' LIMIT 1);
SELECT CONCAT('Using admin_id: ', IFNULL(@admin_id, 'NULL - Please set manually')) as info;

-- If @admin_id is NULL, set it manually:
-- SET @admin_id = 1;

-- General FAQs
INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('What is PawPortal?', 'PawPortal is an online platform that connects people looking to adopt pets with verified shelters and owners. It also provides resources for pet care and a community for pet lovers.', 'General', '["what is", "pawportal", "platform", "about", "introduction"]', @admin_id, TRUE);

-- Adoption FAQs
INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How can I adopt a pet on PawPortal?', 'Create an account, browse available pets, and click on "Adopt Now." You''ll be guided through an application and verification process before final approval.', 'Adoption', '["how to adopt", "adopt pet", "adoption process", "adopt now", "application"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Is there any adoption fee?', 'Yes, adoption fees vary depending on the shelter or owner. The fee covers vaccinations, basic medical checks, and documentation.', 'Adoption', '["adoption fee", "fee", "cost", "price", "adoption cost", "payment"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Can I put my pet up for adoption?', 'Yes, registered users can list their pets for adoption through the "Give for Adoption" option on the dashboard.', 'Adoption', '["give for adoption", "list pet", "put pet up", "give away pet", "rehome"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Are the pets on PawPortal vaccinated?', 'Most pets are vaccinated. Their vaccination details are listed on their profiles under the "Health" section.', 'Health', '["vaccinated", "vaccination", "vaccines", "health", "pet health"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How do I contact a pet owner or shelter?', 'Once you''re logged in, you can use the "Message" or "Contact Shelter" option available on the pet''s profile page.', 'General', '["contact", "message", "contact shelter", "contact owner", "reach out"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Can I adopt pets from another city?', 'Yes, intercity adoption is allowed depending on the shelter''s policy. Some shelters may require an in-person visit.', 'Adoption', '["intercity", "another city", "different city", "remote adoption", "distance"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How do I know if a pet is suitable for my home?', 'Each profile includes temperament, energy level, and compatibility details to help you make an informed choice.', 'Adoption', '["suitable", "compatibility", "temperament", "energy level", "right pet"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Do I need to register before adopting?', 'Yes, registration is mandatory for all adopters and givers to maintain authenticity and security.', 'Account', '["register", "registration", "sign up", "account", "signup required"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How long does the adoption process take?', 'It typically takes 3–7 days for verification and confirmation, depending on the shelter''s response time.', 'Adoption', '["how long", "adoption time", "process time", "verification", "duration"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Can I volunteer for animal shelters through PawPortal?', 'Yes, we partner with shelters that offer volunteer programs. You can find them in the "Volunteer" section.', 'General', '["volunteer", "volunteering", "help", "volunteer program", "shelter volunteer"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('What types of pets can I adopt?', 'You can adopt dogs, cats, rabbits, birds, and other small domestic animals listed on the site.', 'Adoption', '["types", "kinds", "breeds", "pets available", "what pets"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Can I donate to animal shelters via PawPortal?', 'Yes, PawPortal allows you to donate to verified shelters and NGOs through our donation page.', 'General', '["donate", "donation", "contribute", "give money", "support shelters"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How do I report an abusive owner or fake listing?', 'Use the "Report" button on the listing, and our moderation team will investigate within 24–48 hours.', 'General', '["report", "abuse", "fake listing", "report abuse", "moderation"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How do I update my profile information?', 'Go to "My Profile" and click on "Edit Profile" to update your details.', 'Account', '["update profile", "edit profile", "change profile", "profile settings"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Are there any adoption eligibility requirements?', 'Yes, you must be at least 18 years old and provide valid ID proof and a permanent address.', 'Adoption', '["eligibility", "requirements", "age requirement", "qualify", "criteria"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How can I find nearby shelters?', 'Use the "Find Shelter" option and allow location access for automatic nearby recommendations.', 'General', '["find shelter", "nearby shelter", "locate shelter", "shelter location"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Can I adopt more than one pet?', 'Yes, multiple adoptions are allowed, but you must ensure proper care and living space.', 'Adoption', '["multiple pets", "more than one", "adopt multiple", "several pets"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('What should I do if my adopted pet falls sick?', 'Consult a nearby vet immediately. PawPortal also lists partner vets in your area.', 'Health', '["sick pet", "pet illness", "vet", "veterinarian", "pet health problem"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Does PawPortal offer pet insurance?', 'We collaborate with third-party pet insurance providers. You can explore plans in the "Pet Care" section.', 'Health', '["pet insurance", "insurance", "pet care", "insurance plans"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Can I return a pet if adoption doesn''t work out?', 'We strongly discourage returns but allow them under special circumstances through the same shelter.', 'Adoption', '["return pet", "return adoption", "give back", "adoption return"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How can I search for a specific breed?', 'Use the "Filter" or "Advanced Search" option to select breed, age, gender, or location.', 'Adoption', '["search", "filter", "breed search", "find breed", "advanced search"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Are adoption records verified?', 'Yes, all records and user IDs are verified before finalizing adoption.', 'Adoption', '["verified", "verification", "records verified", "authentic"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How can I connect with other pet owners?', 'Join the PawPortal community forum or discussion boards to share experiences and advice.', 'Forum', '["connect", "community", "forum", "pet owners", "discussion"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('What payment methods are accepted for donations or fees?', 'We accept UPI, debit/credit cards, and PayPal for secure transactions.', 'General', '["payment", "payment methods", "UPI", "cards", "paypal", "donation payment"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Is there a mobile app for PawPortal?', 'The mobile app is under development. Currently, you can access all features through the website.', 'General', '["mobile app", "app", "application", "android", "ios"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How can I reset my password?', 'Click on "Forgot Password" on the login page, enter your email, and follow the reset link.', 'Account', '["reset password", "forgot password", "password recovery", "change password"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How do I delete my account?', 'You can delete your account from "Account Settings" or contact support for help.', 'Account', '["delete account", "remove account", "close account", "account deletion"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('What should I do if I find a stray animal?', 'You can report or list it under the "Lost & Found" section with photos and location details.', 'Lost & Found', '["stray", "found animal", "stray animal", "report stray"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Can I post lost pet notices?', 'Yes, use the "Lost Pet" feature to post information and alert nearby users.', 'Lost & Found', '["lost pet", "lost notice", "missing pet", "post lost"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How do I track adoption requests I''ve made?', 'Check the "My Requests" tab in your profile dashboard to see status updates.', 'Adoption', '["track", "adoption requests", "my requests", "status", "track request"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Is PawPortal available outside India?', 'Currently, PawPortal operates within India but plans to expand internationally soon.', 'General', '["outside India", "international", "other countries", "global", "expansion"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Can I chat directly with shelters?', 'Yes, shelters can chat with adopters through the integrated chat system.', 'General', '["chat", "message", "direct chat", "shelter chat", "communication"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Do I get adoption documents after adoption?', 'Yes, you''ll receive digital adoption certificates and health records from the shelter.', 'Adoption', '["documents", "adoption certificate", "papers", "adoption records", "certificate"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Can I upload videos of my pet?', 'Yes, pet profiles support both images and short video uploads.', 'General', '["upload video", "video", "pet video", "video upload", "images"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Are there any background checks for adopters?', 'Some shelters may perform background verification for safety reasons.', 'Adoption', '["background check", "verification", "safety", "check"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('What if I face a technical issue on the website?', 'Contact our tech support using the "Help" button or email support@pawportal.com.', 'General', '["technical issue", "tech support", "help", "problem", "bug", "error"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How do I become a verified shelter partner?', 'Fill out the "Partner with Us" form under the Shelter section and complete verification.', 'General', '["shelter partner", "partner", "verified shelter", "become partner", "shelter registration"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Does PawPortal organize adoption drives or events?', 'Yes, we host online and offline adoption drives in collaboration with NGOs.', 'Events', '["adoption drive", "events", "adoption event", "drive", "ngo"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How can I check if a pet is already adopted?', 'Adopted pets are marked as "Adopted" or removed from the available list.', 'Adoption', '["already adopted", "adopted status", "pet status", "check status"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Are there foster care options available?', 'Yes, some shelters allow temporary fostering. Check the "Foster a Pet" section.', 'Adoption', '["foster", "foster care", "fostering", "temporary", "foster pet"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How can I contribute to PawPortal as a developer or volunteer?', 'Reach out via the "Join Us" page to contribute to our project or help our community.', 'General', '["contribute", "developer", "volunteer", "join us", "help", "contribute code"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('What safety measures does PawPortal follow?', 'We verify every user, shelter, and pet listing to maintain a safe adoption environment.', 'General', '["safety", "security", "safety measures", "verified", "secure"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Does PawPortal offer training or grooming services?', 'We list verified trainers and groomers under the "Pet Services" section.', 'General', '["training", "grooming", "pet services", "trainer", "groomer"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How can I update a pet''s status after adoption?', 'Go to your listed pet''s profile and mark the status as "Adopted" or "Unavailable."', 'Adoption', '["update status", "pet status", "mark adopted", "status change"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How does the recommendation system work?', 'Our algorithm recommends pets based on your location, preferences, and previous activity.', 'General', '["recommendation", "recommended", "suggestions", "algorithm", "recommend"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('What''s the difference between PawPortal and other adoption sites?', 'PawPortal combines adoption, care, community, and donation in one integrated platform.', 'General', '["difference", "vs", "comparison", "unique", "features", "why pawportal"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Can shelters post multiple pets at once?', 'Yes, verified shelters can upload bulk pet listings through the admin dashboard.', 'General', '["bulk upload", "multiple pets", "shelter dashboard", "bulk listing"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('How can I contact customer support?', 'You can email us at support@pawportal.com or use live chat during working hours.', 'General', '["contact", "support", "customer support", "help", "email", "live chat"]', @admin_id, TRUE);

INSERT INTO faqs (question, answer, category, keywords, created_by, is_active) VALUES
('Is my personal information secure on PawPortal?', 'Yes, we use encrypted connections and data protection measures to keep your information safe.', 'General', '["security", "privacy", "data protection", "secure", "personal information", "safe"]', @admin_id, TRUE);

-- Verify the FAQs were inserted
SELECT COUNT(*) as total_faqs FROM faqs WHERE is_active = TRUE;
SELECT category, COUNT(*) as count FROM faqs GROUP BY category ORDER BY count DESC;

