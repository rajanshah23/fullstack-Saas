
export const generateTeacherWelcomeEmail = ({
    teacherName,
    instituteNumber,
    course,
    tempPassword,
    courseLink,
    syllabusLink
}: {
    teacherName: string;
    instituteNumber: string;
    course: {
        courseName: string;
        coursePrice: string;
        courseDuration: string;
        courseLevel: string;
        courseDescription: string;
        courseThumbnail?: string;
    };
    tempPassword: string;
    courseLink: string;
    syllabusLink?: string;
}) => {
  return `
    <div class="max-w-2xl mx-auto my-10 font-sans bg-gradient-to-br from-indigo-400 via-purple-500 to-purple-600 rounded-xl shadow-2xl overflow-hidden">
      
      <!-- Header Section -->
      <div class="bg-gradient-to-br from-indigo-600 to-purple-700 text-white px-8 py-12 text-center relative overflow-hidden">
        <div class="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-radial from-white/10 to-transparent pointer-events-none"></div>
        <h2 class="text-3xl font-bold tracking-tight relative z-10 mb-2">🎓 Welcome to Fullstack-SaaS</h2>
        <p class="text-base opacity-90 relative z-10">Your teaching journey begins here</p>
      </div>
      
      <!-- Main Content -->
      <div class="bg-white px-8 py-12">
        
        <!-- Greeting -->
        <div class="mb-8">
          <p class="text-lg text-gray-700 leading-relaxed mb-4">
            Dear <strong class="text-indigo-600 font-semibold">${teacherName}</strong>,
          </p>
          <p class="text-base text-gray-600 leading-relaxed">
            Congratulations! You have been successfully registered as a teacher at 
            <span class="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent font-semibold">Institute #${instituteNumber}</span>.
          </p>
        </div>

        <!-- Course Details Card -->
        <div class="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-6 my-8 shadow-sm">
          <h3 class="text-xl text-slate-800 font-semibold flex items-center mb-5">
            📚 <span class="ml-2">Your Assigned Course</span>
          </h3>
          
          <div class="space-y-4">
            <div class="flex items-center py-3 border-b border-slate-200">
              <span class="font-semibold text-slate-600 min-w-[120px]">Course Name:</span>
              <span class="text-slate-800 font-medium">${course.courseName}</span>
            </div>
            <div class="flex items-center py-3 border-b border-slate-200">
              <span class="font-semibold text-slate-600 min-w-[120px]">Price:</span>
              <span class="text-emerald-600 font-semibold text-base">${course.coursePrice}</span>
            </div>
            <div class="flex items-center py-3 border-b border-slate-200">
              <span class="font-semibold text-slate-600 min-w-[120px]">Duration:</span>
              <span class="text-slate-800">${course.courseDuration}</span>
            </div>
            <div class="flex items-center py-3 border-b border-slate-200">
              <span class="font-semibold text-slate-600 min-w-[120px]">Level:</span>
              <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">${course.courseLevel}</span>
            </div>
            <div class="py-3">
              <span class="font-semibold text-slate-600 block mb-2">Description:</span>
              <span class="text-slate-500 leading-relaxed">${course.courseDescription}</span>
            </div>
          </div>
        </div>

        <!-- Course Thumbnail -->
        <div class="text-center my-8">
          <div class="inline-block rounded-xl overflow-hidden shadow-lg border-4 border-slate-100">
            <img src="${course.courseThumbnail || 'https://nepal.com/image/hello.png'}" 
                 alt="Course Thumbnail" 
                 class="w-50 h-80 " />
          </div>
        </div>

        <!-- CTA Button -->
        <div class="text-center my-10">
          <a href="${courseLink}" 
             class="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white no-underline rounded-full font-semibold text-base shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 tracking-wide">
            🚀 View Your Course
          </a>
        </div>

        <!-- Login Credentials -->
        <div class="bg-gradient-to-br from-amber-50 to-yellow-100 border border-amber-300 rounded-xl p-6 my-8">
          <h3 class="text-amber-800 text-lg font-semibold flex items-center mb-4">
            🔐 <span class="ml-2">Login Credentials</span>
          </h3>
          <p class="text-base text-amber-900 leading-relaxed mb-4">
            To access your dashboard, please use your registered email and this temporary password:
          </p>
          <div class="bg-white border-2 border-dashed border-amber-400 rounded-lg p-4 text-center my-4">
            <span class="text-xl font-bold text-red-600 font-mono tracking-wider">${tempPassword}</span>
          </div>
          <p class="text-base text-amber-900">
            🌐 Login at: 
            <a href="https://yourplatform.com/login" 
               target="_blank" 
               class="text-indigo-600 font-semibold no-underline hover:text-indigo-800">
              https://your-platform.com/login
            </a>
          </p>
        </div>

        <!-- Security Notice -->
        <div class="bg-red-50 border border-red-200 rounded-lg p-4 my-6">
          <p class="text-sm text-red-800 flex items-center">
            ⚠️ <span class="ml-2"><strong>Security Tip:</strong> Please change your password after your first login for security purposes.</span>
          </p>
        </div>

        <!-- Syllabus Download -->
        ${syllabusLink
            ? `<div class="bg-blue-50 border border-blue-200 rounded-lg p-5 my-6 text-center">
                <p class="text-base text-blue-900 font-semibold mb-4">
                  📄 Course Materials Ready!
                </p>
                <a href="${syllabusLink}" 
                   target="_blank" 
                   class="inline-block px-6 py-3 bg-sky-500 text-white no-underline rounded-lg font-semibold text-sm hover:bg-sky-600 transition-colors duration-200">
                  📥 Download Syllabus PDF
                </a>
              </div>`
            : ''
        }

        <!-- Footer -->
        <div class="border-t-2 border-slate-100 mt-10 mb-5 pt-8 text-center">
          <p class="text-base text-gray-600 mb-3">Best regards,</p>
          <p class="text-lg font-bold text-slate-800">
            <span class="bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">Fullstack SaaS Team</span>
          </p>
          <div class="mt-5 pt-5 border-t border-gray-200">
            <p class="text-xs text-gray-400">
              This email was sent to you because you were registered as a teacher on our platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
};
