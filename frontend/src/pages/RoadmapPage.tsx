import React, { useState } from "react";
import { ThemeProvider } from "next-themes";
import ReactMarkdown from "react-markdown";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import Label from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import DatePicker from "../components/DatePicker";
import RippleButton from "../components/ui/ripple-button";
import { callConsoleGroqApi } from "../api/groq";
import SparklesText from "../components/ui/sparkles-text";
import { motion } from 'framer-motion';
import { Rocket, Brain, Calendar, Target } from 'lucide-react';

const App: React.FC = () => {
  // ... (keeping existing state and functions)
  const [endGoal, setEndGoal] = useState("");
  const [learningSpeed, setLearningSpeed] = useState("");
  const [learningLevel, setLearningLevel] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [roadmap, setRoadmap] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!endGoal) newErrors.endGoal = "Please select an end goal";
    if (!learningSpeed) newErrors.learningSpeed = "Please select your learning speed";
    if (!learningLevel) newErrors.learningLevel = "Please select your learning level";
    if (!startDate) newErrors.startDate = "Please select a start date";
    if (!endDate) newErrors.endDate = "Please select an end date";
    if (startDate && endDate && startDate > endDate) newErrors.dateRange = "End date must be after start date";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const systemMessage = "Generate a personalized learning roadmap.";
      const prompt = `
        I am a ${learningSpeed} aiming to prepare for ${endGoal} at a ${learningLevel} level. My preparation timeline is from ${startDate} to ${endDate}. Ensure the references and YouTube channel links are correct and legitimate, and provide clickable hyperlinks so users can directly access them.

        Please keep in mind the following:

        JEE has three subjects: Physics, Chemistry, and Mathematics.
        GATE has 7 subjects.
        UPSC has 3 subjects.
        CA has 2 subjects.
        Provide the following information:
        
        Goal: A one-line description of the end goal.
        
        Daily Study Plan:
        
        Include a day-wise and topic-wise study plan.
        Provide clickable references for each topic.
        Present the study plan in a bullet point format.
        Example structure 
        
        Day	Topic	Reference
        Day 1-2	Physics: Kinematics	Kinematics - Khan Academy
        Day 3-4	Physics: Dynamics	Dynamics - BYJU'S
        ...	...	...
        YouTube Channels:
        
        Provide a list of YouTube channels for JEE preparation.Also use the youtube api to get the correct links for the channels ensure the links are correct and refer to the correct channel.Only list and provide clickable links which are correct and ensure you double-check them.
        Separate the channels into English and Hindi categories.
        English:
        
        Hindi:
        
        Books List:
        
        Include a list of recommended books for JEE preparation, separated by subject.
        Physics:
        
        
        Chemistry:
        
        
        Mathematics:
        
        
        Websites:
        
        Provide a list of helpful websites for JEE preparation.
        
        
        
        Additional Tips:
        
        Please ensure that the references and resources are reliable and up-to-date. The study plan should be detailed, and each element should be accessible with the provided hyperlinks.
      `;

      const response = await callConsoleGroqApi(prompt, systemMessage);
      setRoadmap(response); // Update roadmap with API response
    } catch (error) {
      console.error("Error generating roadmap:", error);
      setRoadmap("Failed to generate roadmap. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-purple-600/10">
        {/* Animated background patterns */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#68468012_1px,transparent_1px),linear-gradient(to_bottom,#68468012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,#9333ea20_0%,transparent_100%)]" />

        <div className="relative container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <SparklesText>Get Your Personalized Roadmap</SparklesText>
            <p className="mt-4 text-lg text-muted-foreground">
              Create a customized learning journey tailored to your goals and pace
            </p>
          </motion.div>

          {!roadmap ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto backdrop-blur-xl bg-background/60 rounded-2xl shadow-2xl p-8 border border-purple-200/20"
            >
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* End Goal Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <Target className="w-6 h-6 text-purple-500" />
                    <Label htmlFor="end-goal" className="text-xl font-semibold">
                      What is your end goal?
                    </Label>
                  </div>
                  <Select value={endGoal} onValueChange={setEndGoal}>
                    <SelectTrigger id="end-goal" className="w-full h-12 text-lg border-purple-200/20 focus:ring-purple-500/20">
                      <SelectValue placeholder="Select your end goal" />
                    </SelectTrigger>
                    <SelectContent>
                      {["UPSC", "JEE", "NEET", "GATE", "CA"].map((goal) => (
                        <SelectItem key={goal} value={goal} className="text-lg">
                          {goal}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.endGoal && (
                    <p className="text-red-400 text-sm mt-2">{errors.endGoal}</p>
                  )}
                </motion.div>

                {/* Learning Speed Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <Rocket className="w-6 h-6 text-purple-500" />
                    <Label className="text-xl font-semibold">
                      How do you describe your learning speed?
                    </Label>
                  </div>
                  <RadioGroup
                    value={learningSpeed}
                    onValueChange={setLearningSpeed}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    {["Fast learner", "Medium learner", "Slow learner"].map((speed) => (
                      <div key={speed} className="relative">
                        <RadioGroupItem value={speed} id={speed} className="peer sr-only" />
                        <Label
                          htmlFor={speed}
                          className="flex p-4 bg-card/50 rounded-xl cursor-pointer border-2 border-transparent 
                                   peer-checked:border-purple-500 peer-checked:bg-purple-500/10 
                                   hover:bg-purple-50/10 transition-all"
                        >
                          {speed}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {errors.learningSpeed && (
                    <p className="text-red-400 text-sm">{errors.learningSpeed}</p>
                  )}
                </motion.div>

                {/* Learning Level Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <Brain className="w-6 h-6 text-purple-500" />
                    <Label className="text-xl font-semibold">
                      At what level do you want to learn?
                    </Label>
                  </div>
                  <RadioGroup
                    value={learningLevel}
                    onValueChange={setLearningLevel}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    {["Beginner", "Intermediate", "Advanced"].map((level) => (
                      <div key={level} className="relative">
                        <RadioGroupItem value={level} id={level} className="peer sr-only" />
                        <Label
                          htmlFor={level}
                          className="flex p-4 bg-card/50 rounded-xl cursor-pointer border-2 border-transparent 
                                   peer-checked:border-purple-500 peer-checked:bg-purple-500/10 
                                   hover:bg-purple-50/10 transition-all"
                        >
                          {level}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {errors.learningLevel && (
                    <p className="text-red-400 text-sm">{errors.learningLevel}</p>
                  )}
                </motion.div>

                {/* Timeline Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <Calendar className="w-6 h-6 text-purple-500" />
                    <Label className="text-xl font-semibold">
                      Select your preparation timeline:
                    </Label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <Label className="text-lg">Start Date</Label>
                      <DatePicker selected={startDate} onSelect={setStartDate} />
                      {errors.startDate && (
                        <p className="text-red-400 text-sm">{errors.startDate}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-lg">End Date</Label>
                      <DatePicker selected={endDate} onSelect={setEndDate} />
                      {errors.endDate && (
                        <p className="text-red-400 text-sm">{errors.endDate}</p>
                      )}
                    </div>
                  </div>
                  {errors.dateRange && (
                    <p className="text-red-400 text-sm">{errors.dateRange}</p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <div className="pt-6">
                  <RippleButton
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 text-lg font-medium bg-gradient-to-r from-purple-600 to-purple-600 text-white rounded-xl"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating Your Roadmap...
                      </div>
                    ) : (
                      "Generate My Roadmap"
                    )}
                  </RippleButton>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-5xl mx-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-600 bg-clip-text text-transparent">
                  Your Personalized {endGoal} Roadmap
                </h2>
                <button
                  onClick={() => setRoadmap("")}
                  className="px-4 py-2 text-sm font-medium text-purple-600 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  Create New Roadmap
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-8">
                {/* Roadmap Content */}
                <div className="backdrop-blur-xl bg-background/60 rounded-2xl shadow-xl p-8 border border-purple-200/20">
                  <div className="prose prose-lg max-w-none prose-headings:text-purple-600 prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
                    <ReactMarkdown
                      components={{
                        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-600 bg-clip-text text-transparent mb-6" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-xl font-semibold text-purple-600 mt-6 mb-3" {...props} />,
                        table: ({ node, ...props }) => <div className="overflow-x-auto my-6"><table className="min-w-full divide-y divide-gray-300 border border-gray-300 rounded-lg" {...props} /></div>,
                        thead: ({ node, ...props }) => <thead className="bg-purple-50" {...props} />,
                        th: ({ node, ...props }) => <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900" {...props} />,
                        td: ({ node, ...props }) => <td className="px-4 py-3 text-sm text-gray-700 border-t border-gray-200" {...props} />,
                        tr: ({ node, ...props }) => <tr className="hover:bg-purple-50/50 transition-colors" {...props} />,
                        a: ({ node, href, ...props }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-purple-600 font-medium hover:underline transition-colors" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc pl-6 space-y-2 my-4" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 space-y-2 my-4" {...props} />,
                        li: ({ node, ...props }) => <li className="pl-2" {...props} />,
                        blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-purple-300 pl-4 italic text-gray-700 my-4" {...props} />,
                        code: ({ node, ...props }) => <code className="bg-gray-100 text-gray-800 rounded px-1 py-0.5 font-mono text-sm" {...props} />,
                        pre: ({ node, ...props }) => <pre className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto my-4 font-mono text-sm" {...props} />,
                      }}
                    >
                      {roadmap}
                    </ReactMarkdown>
                  </div>
                </div>
                
                {/* Download and Share Options */}
                <div className="flex flex-wrap gap-4 justify-center mt-4">
                  <button 
                    onClick={() => {
                      // Get the rendered roadmap content from the DOM
                      const roadmapElement = document.querySelector('.prose');
                      if (!roadmapElement) return;
                      
                      // Create a hidden div with styled content for printing
                      const printContent = document.createElement("div");
                      
                      // Set up the HTML content with proper styling
                      printContent.innerHTML = `
                        <html>
                          <head>
                            <title>${endGoal} Roadmap</title>
                            <style>
                              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                              
                              body {
                                font-family: 'Inter', Arial, sans-serif;
                                line-height: 1.6;
                                color: #333;
                                max-width: 800px;
                                margin: 0 auto;
                                padding: 20px;
                              }
                              
                              .roadmap-container {
                                padding: 20px;
                              }
                              
                              h1 {
                                color: #6d28d9;
                                font-size: 28px;
                                font-weight: 700;
                                margin-bottom: 24px;
                                text-align: center;
                                padding-bottom: 10px;
                                border-bottom: 2px solid #e5e7eb;
                              }
                              
                              h2 {
                                color: #7c3aed;
                                font-size: 22px;
                                font-weight: 600;
                                margin-top: 24px;
                                margin-bottom: 16px;
                                padding-bottom: 8px;
                                border-bottom: 1px solid #e5e7eb;
                              }
                              
                              h3 {
                                color: #8b5cf6;
                                font-size: 18px;
                                font-weight: 600;
                                margin-top: 20px;
                                margin-bottom: 12px;
                              }
                              
                              p {
                                margin-bottom: 16px;
                                font-size: 16px;
                              }
                              
                              ul, ol {
                                margin-bottom: 20px;
                                padding-left: 24px;
                              }
                              
                              li {
                                margin-bottom: 8px;
                                font-size: 16px;
                              }
                              
                              a {
                                color: #6d28d9;
                                text-decoration: none;
                                font-weight: 500;
                              }
                              
                              table {
                                width: 100%;
                                border-collapse: collapse;
                                margin: 20px 0;
                                font-size: 15px;
                              }
                              
                              th, td {
                                border: 1px solid #ddd;
                                padding: 12px;
                                text-align: left;
                              }
                              
                              th {
                                background-color: #f3f4f6;
                                font-weight: 600;
                              }
                              
                              tr:nth-child(even) {
                                background-color: #f9fafb;
                              }
                              
                              blockquote {
                                border-left: 4px solid #8b5cf6;
                                padding-left: 16px;
                                margin-left: 0;
                                margin-right: 0;
                                font-style: italic;
                                color: #4b5563;
                              }
                              
                              code {
                                font-family: monospace;
                                background-color: #f3f4f6;
                                padding: 2px 4px;
                                border-radius: 4px;
                                font-size: 14px;
                              }
                              
                              pre {
                                background-color: #1f2937;
                                color: #f9fafb;
                                padding: 16px;
                                border-radius: 8px;
                                overflow-x: auto;
                                font-family: monospace;
                                font-size: 14px;
                                margin: 20px 0;
                              }
                              
                              .footer {
                                margin-top: 40px;
                                padding-top: 20px;
                                text-align: center;
                                font-size: 14px;
                                color: #6b7280;
                                border-top: 1px solid #e5e7eb;
                              }
                            </style>
                          </head>
                          <body>
                            <div class="roadmap-container">
                              <h1>Your Personalized ${endGoal} Roadmap</h1>
                              <div id="roadmap-content"></div>
                              <div class="footer">
                                Generated by PrepWise | ${new Date().toLocaleDateString()}
                              </div>
                            </div>
                          </body>
                        </html>
                      `;
                      
                      // Add to document, but hide it
                      printContent.style.display = 'none';
                      document.body.appendChild(printContent);
                      
                      // Create an iframe for printing
                      const printFrame = document.createElement('iframe');
                      printFrame.style.position = 'absolute';
                      printFrame.style.width = '0';
                      printFrame.style.height = '0';
                      printFrame.style.border = '0';
                      document.body.appendChild(printFrame);
                      
                      // Write content to iframe and print with null checks
                      if (printFrame.contentDocument) {
                        printFrame.contentDocument.write(printContent.innerHTML);
                        printFrame.contentDocument.close();
                        
                        // Insert the rendered roadmap content into the iframe
                        const roadmapContainer = printFrame.contentDocument.getElementById('roadmap-content');
                        if (roadmapContainer) {
                          // Apply the HTML content from the rendered roadmap
                          roadmapContainer.innerHTML = roadmapElement.innerHTML;
                          
                          // Fix links to open in new tab
                          const links = roadmapContainer.querySelectorAll('a');
                          links.forEach(link => {
                            link.setAttribute('target', '_blank');
                            link.setAttribute('rel', 'noopener noreferrer');
                          });
                        }
                      }
                      
                      // Wait for content to load before printing
                      printFrame.onload = () => {
                        if (printFrame.contentWindow) {
                          printFrame.contentWindow.focus();
                          printFrame.contentWindow.print();
                        }
                        
                        // Clean up
                        setTimeout(() => {
                          document.body.removeChild(printContent);
                          document.body.removeChild(printFrame);
                        }, 1000);
                      };
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download as PDF
                  </button>
                  
                  <button 
                    onClick={() => {
                      const element = document.createElement("a");
                      const file = new Blob([roadmap], {type: 'text/markdown'});
                      element.href = URL.createObjectURL(file);
                      element.download = `${endGoal.toLowerCase()}-roadmap.md`;
                      document.body.appendChild(element);
                      element.click();
                      document.body.removeChild(element);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 border border-purple-200 rounded-xl font-medium hover:bg-purple-50 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download as Markdown
                  </button>
                  
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(roadmap);
                      alert("Roadmap copied to clipboard!");
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 border border-purple-200 rounded-xl font-medium hover:bg-purple-50 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy to Clipboard
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;