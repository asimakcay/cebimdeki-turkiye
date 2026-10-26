# v11 "Canlı" — tasarım notları

## Yön
- İznik sırlı çini paleti: her bölgenin bir rengi var. Ege turkuaz, Akdeniz mercan, Karadeniz zümrüt, İç Anadolu safran, Doğu kobalt, Güneydoğu nar, Marmara mor. İznik'te turkuaz yaklaşık 1520'de, mercan kırmızısı 1550–60'ta, zümrüt yeşili 1565'te ortaya çıkıyor.
- Cam yalnızca gezinme ve kaplama katmanında: alt bar, il açılış plakası, Ye paneli. Cam üstüne cam yok, parlak fotoğrafın üstüne karartma (scrim) var (Apple HIG Materials / Liquid Glass).
- Renkli zemin üstünde gri metin yok. Metin renkleri aynı tondan elle seçildi, tonlar baştan tanımlandı (Refactoring UI).
- Albers renk etkileşimi; Müller-Brockmann ızgarası; Tidwell'in tutarlı gezinme kalıpları; Türk turizm afişlerindeki düz renk alanları.
- Kaçınılanlar: mor gradyan, neon, cam baloncuk, emoji, tıpatıp aynı kart ızgaraları.
- Erişilebilirlik: AA kontrast; `@supports not (backdrop-filter)` ve `prefers-reduced-transparency` durumlarında opak yedek görünüm.

## Kaynaklar
- https://developer.apple.com/design/human-interface-guidelines/materials
- https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass (WWDC25 219, 356)
- https://www.refactoringui.com/previews/building-your-color-palette
- https://islamicceramics.ashmolean.org/Iznik/timeline.htm , /Iznik/peak.htm
- https://folklife.si.edu (modern İslam seramikleri)

## Önemli Numaralar kaynakları
- 112 tek numara: https://www.icisleri.gov.tr/acil-durumda-tek-numara-112 ; https://www.icisleri.gov.tr/bilgiteknolojileri/yeni-nesil-112-acil-cagri-merkezi
- BTK kısa numaralar listesi: https://www.btk.gov.tr/uploads/ntsfiles/KN.pdf (174, 175, 176, 177, 182–191)
- https://www.vodafone.com.tr/tarifeler/kisa-numaralar (114, 122, 131, 151, 153, 157, 159, 168, 171, 183)
- https://www.alo176.gov.tr/About
- Listeden çıkarılanlar: 170 (Çalışma ve Sosyal Güvenlik Bakanlığı hattı, turizm değil), turizm polisi ve meteoroloji (doğrulanamadı).
