window.onload = function() {
    const API_KEY = 'AIzaSyAH0LquoF4hPTYH4yy2raopLXT5fhU-xoo';
    const SEARCH_ENGINE_ID = '86ab2ac97164c4956';

    // وظيفة البحث
    window.performSearch = function() {
        const query = document.getElementById('searchQuery').value;
        if (query === '') {
            alert('يرجى إدخال مصطلح البحث');
            return;
        }

        const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${API_KEY}&cx=${SEARCH_ENGINE_ID}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const resultsContainer = document.getElementById('results');
                resultsContainer.innerHTML = ''; // مسح النتائج السابقة

                if (data.items && data.items.length > 0) {
                    data.items.forEach(item => {
                        const resultDiv = document.createElement('div');
                        resultDiv.classList.add('result');

                        const title = document.createElement('h3');
                        title.innerHTML = `<a href="${item.link}" target="_blank">${item.title}</a>`;

                        const snippet = document.createElement('p');
                        snippet.textContent = item.snippet;

                        // إضافة صورة إذا كانت متاحة
                        const img = document.createElement('img');
                        img.src = (item.pagemap && item.pagemap.cse_image) ? item.pagemap.cse_image[0].src : 'https://via.placeholder.com/150';
                        img.alt = item.title;

                        resultDiv.appendChild(img);
                        resultDiv.appendChild(title);
                        resultDiv.appendChild(snippet);

                        resultsContainer.appendChild(resultDiv);
                    });
                } else {
                    resultsContainer.innerHTML = '<p>لا توجد نتائج للبحث.</p>';
                }
            })
            .catch(error => {
                console.error('حدث خطأ أثناء جلب نتائج البحث:', error);
            });
    };

    // وظيفة فتح أداة إنشاء السيرة الذاتية
    window.openResumeTool = function() {
        window.open('https://novoresume.com/', '_blank'); // يمكنك استبدال هذا الرابط بأداة الذكاء الاصطناعي المفضلة لديك
    };

    // وظيفة تسجيل الدخول
    window.login = function() {
        const password = document.getElementById('password').value;
        if (password === 'تحيا فلسطين') {
            document.getElementById('loginContainer').style.display = 'none'; // إخفاء واجهة تسجيل الدخول
        } else {
            alert('كلمة المرور غير صحيحة!');
        }
    };

    // وظيفة لتبديل إظهار كلمة المرور
    window.togglePassword = function() {
        const passwordField = document.getElementById('password');
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            passwordField.value = 'تحيا فلسطين'; // تعيين القيمة لتظهر في الحقل
        } else {
            passwordField.type = 'password';
            passwordField.value = ''; // مسح القيمة إذا تم إخفاؤها
        }
    };
};
