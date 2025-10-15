document.addEventListener('DOMContentLoaded', () => {
    const coursesContainer = document.getElementById('courses-container');
    const addCourseBtn = document.getElementById('add-course-btn');
    const calculateBtn = document.getElementById('calculate-btn');
    const gpaResultEl = document.getElementById('gpa-result');
    const classificationResultEl = document.getElementById('classification-result');
    const resultContainer = document.getElementById('result-container');
    const errorMessageEl = document.getElementById('error-message');
    const regularWeightInput = document.getElementById('regular-weight');
    const finalWeightInput = document.getElementById('final-weight');
    const importExcelBtn = document.getElementById('import-excel-btn');
    const excelFileInput = document.getElementById('excel-file-input');
    const downloadSampleBtn = document.getElementById('download-sample-btn');
    const universitySelect = document.getElementById('university-select');
    const universitySearch = document.getElementById('university-search');
    const conversionTableBody = document.getElementById('conversion-table-body');
    const conversionWrapper = document.getElementById('conversion-wrapper');
    const loadingSpinner = document.getElementById('loading-spinner');

    const geminiFeedbackSection = document.getElementById('gemini-feedback-section');
    const getFeedbackBtn = document.getElementById('get-feedback-btn');
    const feedbackLoading = document.getElementById('feedback-loading');
    const feedbackResult = document.getElementById('feedback-result');
    
    const universities = [
        { id: 'AJC', name: 'Học viện Báo chí và Tuyên truyền (AJC)' },
        { id: 'PTIT', name: 'Học viện Bưu chính Viễn thông (PTIT)' },
        { id: 'BA', name: 'Học viện Ngân hàng (BA)' },
        { id: 'DAV', name: 'Học viện Ngoại giao (DAV)' },
        { id: 'AOF', name: 'Học viện Tài chính (AOF)' },
        { id: 'HUST', name: 'Đại học Bách khoa Hà Nội (HUST)' },
        { id: 'HaUI', name: 'Đại học Công nghiệp Hà Nội (HaUI)' },
        { id: 'UTT', name: 'Đại học Công nghệ GTVT (UTT)' },
        { id: 'EPU', name: 'Đại học Điện Lực (EPU)' },
        { id: 'HUP', name: 'Đại học Dược Hà Nội (HUP)' },
        { id: 'UTC', name: 'Đại học Giao thông Vận tải (UTC)' },
        { id: 'HANU', name: 'Đại học Hà Nội (HANU)' },
        { id: 'HAU', name: 'Đại học Kiến trúc Hà Nội (HAU)' },
        { id: 'NEU', name: 'Đại học Kinh tế Quốc dân (NEU)' },
        { id: 'ULSA', name: 'Đại học Lao động - Xã hội (ULSA)' },
        { id: 'HLU', name: 'Đại học Luật Hà Nội (HLU)' },
        { id: 'HOU', name: 'Đại học Mở Hà Nội (HOU)' },
        { id: 'HUMG', name: 'Đại học Mỏ - Địa chất (HUMG)' },
        { id: 'FTU', name: 'Đại học Ngoại thương (FTU)' },
        { id: 'Phenikaa', name: 'Đại học Phenikaa' },
        { id: 'VNU', name: 'Đại học Quốc gia Hà Nội (VNU)' },
        { id: 'HNUE', name: 'Đại học Sư phạm Hà Nội (HNUE)' },
        { id: 'ThangLong', name: 'Đại học Thăng Long' },
        { id: 'TLU', name: 'Đại học Thủy lợi (TLU)' },
        { id: 'TMU', name: 'Đại học Thương mại (TMU)' },
        { id: 'HUC', name: 'Đại học Văn hóa Hà Nội (HUC)' },
        { id: 'HUCE', name: 'Đại học Xây dựng Hà Nội (HUCE)' },
        { id: 'HMU', name: 'Đại học Y Hà Nội (HMU)' },
        { id: 'RMIT', name: 'Đại học RMIT Việt Nam' },
        { id: 'FPTU', name: 'Đại học FPT' },
    ];

    const standardScale = [
        { range: '8.5 - 10', letter: 'A', gpa: 4.0, min: 8.5 },
        { range: '8.0 - 8.4', letter: 'B+', gpa: 3.5, min: 8.0 },
        { range: '7.0 - 7.9', letter: 'B', gpa: 3.0, min: 7.0 },
        { range: '6.5 - 6.9', letter: 'C+', gpa: 2.5, min: 6.5 },
        { range: '5.5 - 6.4', letter: 'C', gpa: 2.0, min: 5.5 },
        { range: '5.0 - 5.4', letter: 'D+', gpa: 1.5, min: 5.0 },
        { range: '4.0 - 4.9', letter: 'D', gpa: 1.0, min: 4.0 },
        { range: 'Dưới 4.0', letter: 'F', gpa: 0.0, min: 0.0 }
    ];

    const gradingScales = {
        EPU: standardScale, PTIT: standardScale, AOF: standardScale, TMU: standardScale,
        HANU: standardScale, BA: standardScale, HUCE: standardScale, UTC: standardScale,
        TLU: standardScale, HOU: standardScale, AJC: standardScale, HaUI: standardScale,
        UTT: standardScale, HUP: standardScale, HAU: standardScale, ULSA: standardScale,
        HLU: standardScale, HUMG: standardScale, HNUE: standardScale, ThangLong: standardScale,
        HUC: standardScale, HMU: standardScale, DAV: standardScale, Phenikaa: standardScale, FPTU: standardScale,
        HUST: [
            { range: '9.0 - 10', letter: 'A+', gpa: 4.0, min: 9.0 }, { range: '8.5 - 8.9', letter: 'A', gpa: 4.0, min: 8.5 },
            { range: '8.0 - 8.4', letter: 'B+', gpa: 3.5, min: 8.0 }, { range: '7.0 - 7.9', letter: 'B', gpa: 3.0, min: 7.0 },
            { range: '6.5 - 6.9', letter: 'C+', gpa: 2.5, min: 6.5 }, { range: '5.5 - 6.4', letter: 'C', gpa: 2.0, min: 5.5 },
            { range: '5.0 - 5.4', letter: 'D+', gpa: 1.5, min: 5.0 }, { range: '4.0 - 4.9', letter: 'D', gpa: 1.0, min: 4.0 },
            { range: 'Dưới 4.0', letter: 'F', gpa: 0.0, min: 0.0 }
        ],
        NEU: [
            { range: '8.5 - 10', letter: 'A', gpa: 4.0, min: 8.5 }, { range: '8.0 - 8.4', letter: 'B+', gpa: 3.7, min: 8.0 },
            { range: '7.0 - 7.9', letter: 'B', gpa: 3.0, min: 7.0 }, { range: '6.0 - 6.9', letter: 'C+', gpa: 2.5, min: 6.0 },
            { range: '5.5 - 5.9', letter: 'C', gpa: 2.0, min: 5.5 }, { range: '5.0 - 5.4', letter: 'D+', gpa: 1.5, min: 5.0 },
            { range: '4.0 - 4.9', letter: 'D', gpa: 1.0, min: 4.0 }, { range: 'Dưới 4.0', letter: 'F', gpa: 0.0, min: 0.0 }
        ],
        VNU: [
            { range: '8.5 - 10', letter: 'A', gpa: 4.0, min: 8.5 }, { range: '8.0 - 8.4', letter: 'B+', gpa: 3.7, min: 8.0 },
            { range: '7.0 - 7.9', letter: 'B', gpa: 3.0, min: 7.0 }, { range: '6.5 - 6.9', letter: 'C+', gpa: 2.7, min: 6.5 },
            { range: '5.5 - 6.4', letter: 'C', gpa: 2.0, min: 5.5 }, { range: '5.0 - 5.4', letter: 'D+', gpa: 1.7, min: 5.0 },
            { range: '4.0 - 4.9', letter: 'D', gpa: 1.0, min: 4.0 }, { range: 'Dưới 4.0', letter: 'F', gpa: 0.0, min: 0.0 }
        ],
        FTU: [
            { range: '8.5 - 10', letter: 'A', gpa: 4.0, min: 8.5 }, { range: '8.0 - 8.4', letter: 'B+', gpa: 3.5, min: 8.0 },
            { range: '7.0 - 7.9', letter: 'B', gpa: 3.0, min: 7.0 }, { range: '6.0 - 6.9', letter: 'C+', gpa: 2.5, min: 6.0 },
            { range: '5.0 - 5.9', letter: 'C', gpa: 2.0, min: 5.0 }, { range: '4.5 - 4.9', letter: 'D+', gpa: 1.5, min: 4.5 },
            { range: '4.0 - 4.4', letter: 'D', gpa: 1.0, min: 4.0 }, { range: 'Dưới 4.0', letter: 'F', gpa: 0.0, min: 0.0 }
        ],
         RMIT: [
            { range: '8.0 - 10', letter: 'HD', gpa: 4.0, min: 8.0 }, { range: '7.0 - 7.9', letter: 'DI', gpa: 3.0, min: 7.0 },
            { range: '6.0 - 6.9', letter: 'CR', gpa: 2.0, min: 6.0 }, { range: '5.0 - 5.9', letter: 'PA', gpa: 1.0, min: 5.0 },
            { range: 'Dưới 5.0', letter: 'NN', gpa: 0.0, min: 0.0 }
         ]
    };
    
    const fetchGeminiFeedback = async (prompt) => {
        const proxyUrl = '/.netlify/functions/call-gemini';

        try {
            const response = await fetch(proxyUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: prompt }) // Gửi prompt
            });
            
            if (!response.ok) {
                throw new Error(`API call failed with status: ${response.status}`);
            }

            const result = await response.json();
            const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

            if (text) {
                return text;
            } else {
                return "Rất tiếc, AI không thể đưa ra phản hồi lúc này. Vui lòng thử lại sau.";
            }
        } catch (error) {
            console.error("Error calling proxy function:", error);
            return "Đã xảy ra lỗi khi kết nối với AI. Vui lòng kiểm tra lại kết nối mạng và thử lại.";
        }
    };
    
    const populateUniversityList = (filter = '') => {
        universitySelect.innerHTML = '';
        const lowerCaseFilter = filter.toLowerCase();
        const filteredUniversities = universities.filter(uni => uni.name.toLowerCase().includes(lowerCaseFilter));

        filteredUniversities.forEach(uni => {
            const option = document.createElement('option');
            option.value = uni.id;
            option.textContent = uni.name;
            if(uni.id === 'EPU' && filter === '') { 
                option.selected = true;
            }
            universitySelect.appendChild(option);
        });
    };
    
    const updateConversionTable = (schoolId) => {
         if (!schoolId || !gradingScales[schoolId]) return;
        const scale = gradingScales[schoolId];
        conversionTableBody.innerHTML = ''; 
        scale.forEach(item => {
            const row = document.createElement('tr');
            row.className = 'border-b';
            row.innerHTML = `<td class="p-2">${item.range}</td><td class="p-2 font-medium">${item.letter}</td><td class="p-2 font-medium">${item.gpa.toFixed(1)}</td>`;
            conversionTableBody.appendChild(row);
        });
    };

    const showConversionTable = (schoolId) => {
        if (!schoolId) return;
        conversionWrapper.classList.remove('hidden');
        loadingSpinner.classList.remove('hidden');
        conversionTableBody.closest('table').classList.add('hidden');

        setTimeout(() => {
            loadingSpinner.classList.add('hidden');
            conversionTableBody.closest('table').classList.remove('hidden');
            updateConversionTable(schoolId);
        }, 500);
    };

    universitySearch.addEventListener('input', () => {
        populateUniversityList(universitySearch.value);
    });

    universitySearch.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const firstOption = universitySelect.querySelector('option');
            if (firstOption) {
                universitySelect.value = firstOption.value;
                universitySelect.dispatchEvent(new Event('change'));
            }
        }
    });

    const createCourseRow = () => {
        const row = document.createElement('div');
        row.className = 'grid grid-cols-12 gap-2 items-center course-row fade-in';
        row.innerHTML = `
            <div class="col-span-12 sm:col-span-4"><input type="text" placeholder="Tên môn học (không bắt buộc)" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"></div>
            <div class="col-span-6 sm:col-span-2"><input type="number" min="0" placeholder="Số TC" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition credits" required></div>
            <div class="col-span-6 sm:col-span-2"><input type="number" min="0" max="10" step="0.1" placeholder="TB TK" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition regular-avg" required></div>
            <div class="col-span-6 sm:col-span-2"><input type="number" min="0" max="10" step="0.1" placeholder="Điểm CK" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition final-exam" required></div>
            <div class="col-span-12 sm:col-span-2 flex justify-end"><button class="remove-course-btn bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-all duration-300 shadow w-full sm:w-auto">Xóa</button></div>
        `;
        coursesContainer.appendChild(row);
    };
    
    addCourseBtn.addEventListener('click', createCourseRow);
    
    downloadSampleBtn.addEventListener('click', () => {
        const sampleData = [["Tên môn", "Số TC", "TB Thường kỳ", "Điểm cuối kỳ"], ["Toán cao cấp A1", 3, 8.0, 7.5], ["Vật lý đại cương", 3, 7.0, 6.5], ["Lập trình C++", 4, 9.0, 8.5]];
        const worksheet = XLSX.utils.aoa_to_sheet(sampleData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Diem_Mau");
        worksheet['!cols'] = [{ wch: 30 }, { wch: 10 }, { wch: 15 }, { wch: 15 }];
        XLSX.writeFile(workbook, "file_diem_mau.xlsx");
    });

    importExcelBtn.addEventListener('click', () => excelFileInput.click());

    excelFileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                if (jsonData.length === 0) { showError("File Excel rỗng hoặc không có dữ liệu."); return; }
                coursesContainer.innerHTML = '';
                let startIndex = (jsonData.length > 0 && isNaN(parseFloat(jsonData[0][1]))) ? 1 : 0;
                if (jsonData.length <= startIndex) { showError("Không tìm thấy dữ liệu môn học hợp lệ."); createCourseRow(); return; }
                for (let i = startIndex; i < jsonData.length; i++) {
                    const rowData = jsonData[i];
                     if (!rowData || rowData.length < 4 || !rowData[1] || !rowData[2] || !rowData[3]) continue;
                    createCourseRow();
                    const newRowElement = coursesContainer.lastElementChild;
                    newRowElement.querySelector('input[type="text"]').value = rowData[0] || '';
                    newRowElement.querySelector('.credits').value = rowData[1] || '';
                    newRowElement.querySelector('.regular-avg').value = rowData[2] || '';
                    newRowElement.querySelector('.final-exam').value = rowData[3] || '';
                }
                if (coursesContainer.children.length === 0) createCourseRow();
            } catch (error) {
                console.error("Lỗi khi đọc file Excel:", error);
                showError("Đã xảy ra lỗi khi xử lý file. Vui lòng kiểm tra định dạng file.");
            } finally {
                excelFileInput.value = '';
            }
        };
        reader.readAsArrayBuffer(file);
    });

    coursesContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-course-btn')) {
            if (coursesContainer.children.length > 1) {
                 e.target.closest('.course-row').remove();
            } else { showError("Bạn phải có ít nhất một môn học."); }
        }
    });

    const convertGradeTo4 = (grade10, schoolId) => {
        const scale = gradingScales[schoolId];
         if (!scale) return 0.0;
        for (const item of scale) {
            if (grade10 >= item.min) {
                return item.gpa;
            }
        }
        return 0.0;
    };

    const getClassification = (gpa) => {
        if (gpa >= 3.6) return 'Xuất sắc';
        if (gpa >= 3.2) return 'Giỏi';
        if (gpa >= 2.5) return 'Khá';
        if (gpa >= 2.0) return 'Trung bình';
        return 'Yếu';
    };

    const showError = (message) => {
        errorMessageEl.textContent = message;
        errorMessageEl.classList.remove('hidden');
        setTimeout(() => errorMessageEl.classList.add('hidden'), 4000);
    };
    
    universitySelect.addEventListener('change', (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        if (selectedOption) {
            universitySearch.value = selectedOption.textContent;
        }
        showConversionTable(e.target.value);
        if(!resultContainer.classList.contains('hidden')) {
            calculateBtn.click();
        }
    });

    calculateBtn.addEventListener('click', () => {
        let totalCredits = 0;
        let totalWeightedPoints = 0;
        let hasValidInput = false;
        const schoolId = universitySelect.value;
        const regularWeight = parseFloat(regularWeightInput.value) || 0;
        const finalWeight = parseFloat(finalWeightInput.value) || 0;
        
        if (regularWeight + finalWeight !== 100) { showError("Tổng tỷ lệ thường kỳ và cuối kỳ phải bằng 100%."); return; }

        const courseRows = document.querySelectorAll('.course-row');
        errorMessageEl.classList.add('hidden');
        document.querySelectorAll('.border-red-500').forEach(el => el.classList.remove('border-red-500'));

        courseRows.forEach(row => {
            const creditsInput = row.querySelector('.credits');
            const regularAvgInput = row.querySelector('.regular-avg');
            const finalExamInput = row.querySelector('.final-exam');

            const credits = parseFloat(creditsInput.value);
            const regularAvg = parseFloat(regularAvgInput.value);
            const finalExam = parseFloat(finalExamInput.value);
            
            let isValidRow = true;
            if (isNaN(credits) || credits <= 0) { if(creditsInput.value) creditsInput.classList.add('border-red-500'); isValidRow = false; }
            if (isNaN(regularAvg) || regularAvg < 0 || regularAvg > 10) { if(regularAvgInput.value) regularAvgInput.classList.add('border-red-500'); isValidRow = false; }
            if (isNaN(finalExam) || finalExam < 0 || finalExam > 10) { if(finalExamInput.value) finalExamInput.classList.add('border-red-500'); isValidRow = false; }

            if (isValidRow && (creditsInput.value || regularAvgInput.value || finalExamInput.value) ) {
                const grade10 = (regularAvg * regularWeight / 100) + (finalExam * finalWeight / 100);
                const grade4 = convertGradeTo4(grade10, schoolId);
                totalWeightedPoints += grade4 * credits;
                totalCredits += credits;
                hasValidInput = true;
            }
        });

        if (totalCredits === 0) {
             if(!hasValidInput) { showError("Vui lòng nhập thông tin hợp lệ. Tín chỉ phải lớn hơn 0 và điểm từ 0 đến 10."); }
            resultContainer.classList.add('hidden');
            return;
        }

        const gpa = totalWeightedPoints / totalCredits;
        gpaResultEl.textContent = gpa.toFixed(2);
        classificationResultEl.textContent = getClassification(gpa);
        resultContainer.classList.remove('hidden');
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });

        geminiFeedbackSection.classList.remove('hidden');
        getFeedbackBtn.classList.remove('hidden');
        feedbackResult.classList.add('hidden');
        feedbackLoading.classList.add('hidden');
        feedbackResult.innerHTML = '';
    });

    getFeedbackBtn.addEventListener('click', async () => {
        getFeedbackBtn.classList.add('hidden');
        feedbackLoading.classList.remove('hidden');
        feedbackResult.classList.add('hidden');

        const gpa = gpaResultEl.textContent;
        const classification = classificationResultEl.textContent;
        const selectedSchool = universitySelect.options[universitySelect.selectedIndex].textContent;
        
        let courseDetails = [];
        const courseRows = document.querySelectorAll('.course-row');
        const regularWeight = parseFloat(regularWeightInput.value) || 0;
        const finalWeight = parseFloat(finalWeightInput.value) || 0;

        courseRows.forEach(row => {
            const name = row.querySelector('input[type="text"]').value || 'Môn học không tên';
            const credits = parseFloat(row.querySelector('.credits').value);
            const regularAvg = parseFloat(row.querySelector('.regular-avg').value);
            const finalExam = parseFloat(row.querySelector('.final-exam').value);

            if (!isNaN(credits) && credits > 0 && !isNaN(regularAvg) && !isNaN(finalExam)) {
                const grade10 = (regularAvg * regularWeight / 100) + (finalExam * finalWeight / 100);
                courseDetails.push(`- ${name} (${credits} TC): Điểm tổng kết hệ 10 là ${grade10.toFixed(2)}`);
            }
        });

        const userPrompt = `Hãy phân tích kết quả học tập của một sinh viên và cho lời khuyên.
            - Trường: ${selectedSchool}
            - GPA tích lũy: ${gpa}
            - Xếp loại: ${classification}
            - Chi tiết các môn trong kỳ:
            ${courseDetails.join('\n')}

        Dựa trên thông tin này, hãy:
        1.  Đưa ra một nhận xét tổng quan thật tích cực và khích lệ.
        2.  Chỉ ra (các) môn học là điểm sáng, thế mạnh của sinh viên.
        3.  Xác định (các) môn học cần chú ý cải thiện.
        4.  Đề xuất 2-3 chiến lược học tập cụ thể và khả thi để nâng cao kết quả trong kỳ học tiếp theo.
        Hãy trình bày câu trả lời một cách rõ ràng, có các đề mục và sử dụng Markdown để định dạng.`;

        const feedbackText = await fetchGeminiFeedback(userPrompt);
        
        let formattedFeedback = feedbackText
          .replace(/(\d\.)/g, '<br><strong>$1</strong>')
          .replace(/\n- /g, '<br>&bull; ')
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
           .replace(/\n/g, '<br>');


        feedbackResult.innerHTML = formattedFeedback;
        feedbackLoading.classList.add('hidden');
        feedbackResult.classList.remove('hidden');
    });

    populateUniversityList();
    createCourseRow();
});

