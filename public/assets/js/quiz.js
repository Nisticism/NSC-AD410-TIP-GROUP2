$(document).ready(function () {
    $("#begin").click(function () {

        Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
        Survey.Survey.cssType = "bootstrap";
        var survey = new Survey.Model({
                "pages": [{
                    "elements": [{
                        "type": "radiogroup",
                        "choices": ["AHSS", "BEIT", "BTS", "HHS", "LIB", "M&S"],
                        "name": "question1",
                        "title": "What is your division?"
                    }], "name": "page1"
                }, {
                    "elements": [{"type": "text", "name": "question2", "title": "Course Prefix"}, {
                        "type": "text",
                        "name": "question3",
                        "title": "Course Number"
                    }], "name": "page2"
                }, {
                    "elements": [{
                        "type": "radiogroup",
                        "choices": ["Winter 2015", "Spring 2015", "Summer 2015", "Fall 2015", "Winter 2016", "Spring 2016", "Summer 2016", "Fall 2016", "Winter 2016", "Spring 2016", "Summer 2016"],
                        "name": "question4",
                        "title": "Quarter Year"
                    }], "name": "page3"
                }, {
                    "elements": [{
                        "type": "comment",
                        "name": "question5",
                        "title": "If this is a group TIP, please list all faculty participating. Thank you!"
                    }], "name": "page4"
                }, {
                    "elements": [{
                        "type": "comment",
                        "name": "question6",
                        "title": "What is the problem or lesson that you identified and will be discussing in this TIP? No topic is too big or too small. All are welcomed!"
                    }], "name": "page5"
                }, {
                    "elements": [{
                        "type": "comment",
                        "name": "question7",
                        "title": "What is the course-level objective that this TIP best addresses?"
                    }], "name": "page6"
                }, {
                    "elements": [{
                        "type": "radiogroup",
                        "choices": ["Facts, theories, perspectives, and methodologies within and across disciplines", "Critical thinking and problem solving", "Communication and self-expression", "Quantitative reasoning", "Information literacy", "Technological proficiency", "Collaboration: group and team work", "Civic engagement: local, global, and environmental", "Intercultural knowledge and competence", "Ethical awareness and personal integrity", "Lifelong learning and personal well-being", "Synthesis and application of knowledge, skills, and responsibilities to new settings and problems"],
                        "name": "question8",
                        "title": "Which of the college-wide Essential Learning Outcomes does your TIP most closely address?"
                    }], "name": "page7"
                }, {
                    "elements": [{
                        "type": "radiogroup",
                        "choices": ["Direct student feedback (e.g. written or verbal communication with students, SGID, etc.)", "Student behavior (e.g. length of time to complete a learning activity, number of clarifying questions the students asked, etc.)", "Student performance on a learning activity, assignment, a quiz or exam, a skill demonstration, oral presentation, etc."],
                        "name": "question9",
                        "title": "Which of the following best describes the evidence you found for the problem."
                    }], "name": "page8"
                }, {
                    "elements": [{
                        "type": "comment",
                        "name": "question10",
                        "rows": "6",
                        "title": "Please describe more specifically how you identified the problem. For example, \"Based on discussion posts, I realized that more than half of the class did not understand the prompt and was not demonstrating the kind of comprehension I was looking for.\""
                    }], "name": "page9"
                }, {
                    "elements": [{
                        "type": "radiogroup",
                        "choices": ["Modified a learning activity", "Added new learning activity", "Provided more context or more practice", "Provided “real world” examples or applications", "Tried a new approach to the material", "Reapportioned time/effort devoted to topics", "Reviewed the material"],
                        "name": "question11",
                        "title": "Please select the change that best fits what you did to try to address the problem."
                    }], "name": "page10"
                }, {
                    "elements": [{
                        "type": "comment",
                        "name": "question12",
                        "rows": "6",
                        "title": "Specifically, what did you do to address the problem? For example, \"I broke the prompt down into two separate discussions so that it was clearer what the students should think about and write about in their posts.\""
                    }], "name": "page11"
                }, {
                    "elements": [{
                        "type": "radiogroup",
                        "choices": ["Direct student feedback (e.g. written or verbal communication with students, SGID, etc.)", "Student behavior behavior (e.g. length of time to complete a learning, activity, number of clarifying questions the students asked, etc.)", "Student performance on a learning activity, assignment, a quiz or exam, a skill demonstration, oral presentation, etc."],
                        "name": "question13",
                        "title": "Please select the evidence that best fits how you assessed the impact of the change you made."
                    }], "name": "page12"
                }, {
                    "elements": [{
                        "type": "comment",
                        "name": "question14",
                        "title": "Please describe more fully how you assessed the impact of the change you made. For example, \"After I broke the prompt into two discussions, more students were able to write about the ideas thoroughly. This time it was about 75% of students. I might want to refine the prompts even further, but this was a good change.\""
                    }], "name": "page13"
                }, {
                    "elements": [{
                        "type": "radiogroup",
                        "choices": ["Gave you an idea for additional changes to this course", "Gave you an idea for changes to another course", "Suggested a topic for discussion with colleagues in your program/discipline", "Suggested a topic that an interdisciplinary group of faculty could productively examine", "Prompted consideration of a sabbatical for more in-depth study", "Uncovered a topic for a faculty retreat"],
                        "name": "question15",
                        "title": "What new opportunities did you consider as a result of identifying this problem and making this change?"
                    }], "name": "page14"
                }, {
                    "elements": [{
                        "type": "comment",
                        "name": "question16",
                        "title": "What else would you like to share about the teaching improvement process you engaged in this quarter?"
                    }], "name": "page15"
                }, {
                    "elements": [{
                        "type": "radiogroup",
                        "choices": ["Yes, you may use my specifics to share with colleagues", "No, I would rather not share any specifics"],
                        "name": "question17",
                        "title": "TIP data will be shared de-identified and in aggregate. TIPs are NOT an evaluation of your teaching. It is useful to campus-wide assessment and professional development to use specifics of individual TIPs."
                    }], "name": "page16"
                }, {
                    "elements": [{
                        "type": "html",
                        "html": "<p>Thank you for your TIP!</p>\n\n<p>The Canvas system automatically saves information as you fill out this form. You may return to it at any time before choosing \"Submit.\"</p>\n\n<p>If you are not yet done, simply log out of Canvas or shut down your browser. Your information will be saved.</p>\n\n<p>DO NOT CHOOSE SUBMIT until you have completed your TIP.</p>",
                        "name": "question18"
                    }], "name": "page17"
                }]
            },
            "container");
        //options for progress bar - top, bottom, none
        survey.showProgressBar = "top";
        survey.render();
        // use this for custom messages after survey completed; if no text provided, uses default message
        survey.completedHtml = "";
        survey.render();
        // when set to false, prevents the after survey message from displaying
        survey.showCompletedPage = true;
        survey.render();
        // gathers survey answer data and does something with it
        survey.onComplete.add(function (sender) {
            var mySurvey = sender;
            var surveyData = sender.data;
            document.getElementById("results").innerHTML = JSON.stringify(surveyData);
        });
        //survey.onComplete.add(sendDataToServer);
    });
});