import os
import re
import base64
import subprocess
import tempfile

def image_to_base64(path):
    if os.path.exists(path):
        with open(path, "rb") as f:
            ext = os.path.splitext(path)[1].lower().replace('.', '')
            if ext == 'jpg': ext = 'jpeg'
            data = base64.b64encode(f.read()).decode('utf-8')
            return f"data:image/{ext};base64,{data}"
    return ""

screens_dir = r"C:\Users\CORTEC\.gemini\antigravity-ide\brain\5ff8698b-3e2f-4b90-b20e-0dd52565cd7d\screens"
qr_path = r"C:\Users\CORTEC\Downloads\Erasmus\baseera\baseera_qrcode.png"

img_splash = image_to_base64(os.path.join(screens_dir, "1_splash.png"))
img_onboard1 = image_to_base64(os.path.join(screens_dir, "2_onboarding1.png"))
img_onboard2 = image_to_base64(os.path.join(screens_dir, "3_onboarding2.png"))
img_onboard3 = image_to_base64(os.path.join(screens_dir, "4_onboarding3.png"))
img_home = image_to_base64(os.path.join(screens_dir, "5_home.png"))
img_share = image_to_base64(os.path.join(screens_dir, "6_share.png"))
img_processing = image_to_base64(os.path.join(screens_dir, "7_processing.png"))
img_result = image_to_base64(os.path.join(screens_dir, "8_result.png"))
img_privacy = image_to_base64(os.path.join(screens_dir, "9_privacy.png"))
img_qr = image_to_base64(qr_path)

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Baseera — Presentation Script & Project Guide</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

  @page {{
    size: A4 portrait;
    margin: 12mm 12mm 12mm 12mm;
  }}

  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }}

  body {{
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #1E293B;
    background-color: #FFFFFF;
    line-height: 1.5;
    font-size: 11.5px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }}

  .page-break {{
    page-break-before: always;
  }}

  .avoid-break {{
    page-break-inside: avoid;
  }}

  /* Top Banner */
  .cover-header {{
    background: linear-gradient(135deg, #090D16 0%, #0F172A 50%, #0284C7 100%);
    color: #FFFFFF;
    padding: 24px 22px;
    border-radius: 12px;
    margin-bottom: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }}

  .cover-tag {{
    display: inline-block;
    background: rgba(14, 165, 233, 0.2);
    color: #38BDF8;
    border: 1px solid rgba(56, 189, 248, 0.4);
    padding: 3px 10px;
    border-radius: 9999px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }}

  .cover-title {{
    font-size: 26px;
    font-weight: 800;
    letter-spacing: -0.5px;
    color: #FFFFFF;
  }}

  .cover-subtitle {{
    font-size: 13px;
    color: #94A3B8;
    font-weight: 500;
    margin: 4px 0 10px 0;
  }}

  .cover-motto {{
    font-size: 12px;
    font-style: italic;
    color: #38BDF8;
    border-left: 3px solid #38BDF8;
    padding-left: 10px;
    margin-bottom: 14px;
  }}

  .team-grid {{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 6px;
  }}

  .team-card {{
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 8px;
    padding: 8px 6px;
    text-align: center;
  }}

  .team-name {{
    font-weight: 700;
    font-size: 11px;
    color: #FFFFFF;
  }}

  .team-country {{
    font-size: 9.5px;
    color: #38BDF8;
    font-weight: 600;
  }}

  .team-slides {{
    font-size: 8.5px;
    color: #94A3B8;
    margin-top: 2px;
  }}

  /* Section Styling */
  .section-header {{
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 14px 0 8px 0;
    padding-bottom: 4px;
    border-bottom: 2px solid #E2E8F0;
  }}

  .section-icon {{
    background: #0284C7;
    color: white;
    width: 20px;
    height: 20px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 11px;
  }}

  .section-title {{
    font-size: 14px;
    font-weight: 800;
    color: #0F172A;
  }}

  .badge {{
    display: inline-block;
    padding: 2px 7px;
    border-radius: 4px;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
  }}

  .badge-blue {{ background: #E0F2FE; color: #0284C7; border: 1px solid #BAE6FD; }}
  .badge-amber {{ background: #FEF3C7; color: #D97706; border: 1px solid #FDE68A; }}
  .badge-emerald {{ background: #D1FAE5; color: #059669; border: 1px solid #A7F3D0; }}
  .badge-purple {{ background: #F3E8FF; color: #7C3AED; border: 1px solid #E9D5FF; }}
  .badge-rose {{ background: #FFE4E6; color: #E11D48; border: 1px solid #FECDD3; }}
  .badge-dark {{ background: #0F172A; color: #F8FAFC; }}

  /* Slide Cards */
  .slide-card {{
    background: #FFFFFF;
    border: 1px solid #CBD5E1;
    border-radius: 8px;
    margin-bottom: 8px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.02);
    page-break-inside: avoid;
  }}

  .slide-card-header {{
    background: #F8FAFC;
    border-bottom: 1px solid #E2E8F0;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }}

  .slide-meta {{
    display: flex;
    align-items: center;
    gap: 6px;
  }}

  .slide-num {{
    background: #0F172A;
    color: #FFFFFF;
    font-size: 9.5px;
    font-weight: 800;
    padding: 2px 5px;
    border-radius: 4px;
  }}

  .slide-title {{
    font-size: 11.5px;
    font-weight: 700;
    color: #0F172A;
  }}

  .slide-speaker {{
    font-size: 10px;
    font-weight: 700;
  }}

  .slide-body {{
    padding: 7px 10px;
  }}

  .script-label {{
    font-size: 8.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #64748B;
    margin-bottom: 3px;
  }}

  .script-text {{
    font-size: 11px;
    color: #0F172A;
    line-height: 1.45;
    background: #F8FAFC;
    border-left: 3px solid #0284C7;
    padding: 6px 9px;
    border-radius: 0 6px 6px 0;
    margin-bottom: 5px;
  }}

  .script-text strong {{
    color: #0369A1;
  }}

  .transition-cue {{
    font-size: 9.5px;
    color: #0369A1;
    background: #F0F9FF;
    border: 1px dashed #BAE6FD;
    padding: 3px 8px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
  }}

  /* Screens Grid */
  .screens-grid {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 6px;
  }}

  .screen-card {{
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    padding: 8px;
    display: flex;
    gap: 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.02);
    page-break-inside: avoid;
  }}

  .screen-img-wrap {{
    flex: 0 0 80px;
    height: 155px;
    border-radius: 6px;
    overflow: hidden;
    background: #0F172A;
    border: 1.5px solid #CBD5E1;
  }}

  .screen-img {{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }}

  .screen-info {{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }}

  .screen-number {{
    font-size: 8.5px;
    font-weight: 700;
    color: #0284C7;
    text-transform: uppercase;
  }}

  .screen-heading {{
    font-size: 11px;
    font-weight: 700;
    color: #0F172A;
    margin-bottom: 2px;
  }}

  .screen-desc {{
    font-size: 9.5px;
    color: #475569;
    line-height: 1.35;
  }}

  .screen-bullets {{
    margin-top: 3px;
    list-style: none;
  }}

  .screen-bullets li {{
    font-size: 8.5px;
    color: #64748B;
    position: relative;
    padding-left: 8px;
    margin-bottom: 1px;
  }}

  .screen-bullets li::before {{
    content: "-";
    position: absolute;
    left: 0;
    color: #0284C7;
  }}

  /* QR Box */
  .qr-container {{
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%);
    border: 1px solid #BAE6FD;
    border-radius: 10px;
    padding: 10px 14px;
    gap: 14px;
    margin-top: 8px;
  }}

  .qr-image {{
    width: 85px;
    height: 85px;
    border-radius: 6px;
    background: #FFFFFF;
    padding: 4px;
  }}

  .qr-details h4 {{
    font-size: 12px;
    font-weight: 700;
    color: #0369A1;
    margin-bottom: 2px;
  }}

  .qr-details p {{
    font-size: 10px;
    color: #334155;
    margin-bottom: 4px;
  }}

  .download-link {{
    display: inline-block;
    background: #0284C7;
    color: #FFFFFF;
    padding: 3px 10px;
    border-radius: 4px;
    font-size: 9.5px;
    font-weight: 600;
    text-decoration: none;
  }}

  table {{
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0;
    font-size: 10.5px;
  }}

  th {{
    background: #0F172A;
    color: #FFFFFF;
    text-align: left;
    padding: 6px 8px;
    font-weight: 600;
  }}

  td {{
    padding: 6px 8px;
    border-bottom: 1px solid #E2E8F0;
    color: #334155;
  }}

  tr:nth-child(even) td {{
    background: #F8FAFC;
  }}

  .footer-note {{
    margin-top: 14px;
    padding-top: 6px;
    border-top: 1px solid #E2E8F0;
    display: flex;
    justify-content: space-between;
    font-size: 8.5px;
    color: #94A3B8;
  }}
</style>
</head>
<body>

  <!-- ==================== PAGE 1: COVER & EXECUTIVE OVERVIEW ==================== -->
  <div class="cover-header">
    <div class="cover-tag">VirtuallyEdu • Erasmus+ Digital Hackathon</div>
    <div class="cover-title">Baseera</div>
    <div class="cover-subtitle">AI-Powered Digital Literacy & Critical Thinking Coach</div>
    <div class="cover-motto">"Teaching minds to doubt, not machines to decide."</div>

    <div class="team-grid">
      <div class="team-card">
        <div class="team-name">Abdelkader</div>
        <div class="team-country">Algeria</div>
        <div class="team-slides">Slides 1-3, 8-11, 19</div>
      </div>
      <div class="team-card">
        <div class="team-name">Azatuhi</div>
        <div class="team-country">Armenia</div>
        <div class="team-slides">Slides 4-6 (The Problem)</div>
      </div>
      <div class="team-card">
        <div class="team-name">Fotini</div>
        <div class="team-country">Greece</div>
        <div class="team-slides">Slides 7, 14 (Solution & Features)</div>
      </div>
      <div class="team-card">
        <div class="team-name">Anastasia</div>
        <div class="team-country">Ukraine</div>
        <div class="team-slides">Slides 12-13, 18 (Demo & Try It)</div>
      </div>
      <div class="team-card">
        <div class="team-name">Milena</div>
        <div class="team-country">Georgia</div>
        <div class="team-slides">Slides 15-17 (Impact & Plans)</div>
      </div>
    </div>
  </div>

  <div class="section-header">
    <div class="section-icon">&#9733;</div>
    <div class="section-title">Presentation Overview & Quick Reference Table</div>
  </div>

  <table class="avoid-break">
    <thead>
      <tr>
        <th style="width: 14%;">Slide(s)</th>
        <th style="width: 24%;">Slide Title / Topic</th>
        <th style="width: 22%;">Speaker & Country</th>
        <th style="width: 15%;">Target Time</th>
        <th style="width: 25%;">Handoff To</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Slide 1</strong></td>
        <td>Cover & Project Title</td>
        <td>Abdelkader (Algeria)</td>
        <td>~25 sec</td>
        <td>Self ➔ Slide 2</td>
      </tr>
      <tr>
        <td><strong>Slide 2</strong></td>
        <td>Table of Contents / Agenda</td>
        <td>Abdelkader (Algeria)</td>
        <td>~20 sec</td>
        <td>Self ➔ Slide 3</td>
      </tr>
      <tr>
        <td><strong>Slide 3</strong></td>
        <td>Meet the Team</td>
        <td>Abdelkader (Algeria)</td>
        <td>~25 sec</td>
        <td>Pass mic to <strong>Azatuhi</strong></td>
      </tr>
      <tr>
        <td><strong>Slides 4-6</strong></td>
        <td>The Problem (Misinformation, Emotion, Tools)</td>
        <td>Azatuhi (Armenia)</td>
        <td>~75 sec total</td>
        <td>Pass mic to <strong>Fotini</strong></td>
      </tr>
      <tr>
        <td><strong>Slide 7</strong></td>
        <td>The Solution: Baseera Core Philosophy</td>
        <td>Fotini (Greece)</td>
        <td>~30 sec</td>
        <td>Pass mic to <strong>Abdelkader</strong></td>
      </tr>
      <tr>
        <td><strong>Slides 8-11</strong></td>
        <td>How It Works (Share ➔ Analyze ➔ Reflect ➔ Grow)</td>
        <td>Abdelkader (Algeria)</td>
        <td>~85 sec total</td>
        <td>Pass mic to <strong>Anastasia</strong></td>
      </tr>
      <tr>
        <td><strong>Slides 12-13</strong></td>
        <td>Screens Demo (App Walkthrough)</td>
        <td>Anastasia (Ukraine)</td>
        <td>~65 sec total</td>
        <td>Pass mic to <strong>Fotini</strong></td>
      </tr>
      <tr>
        <td><strong>Slide 14</strong></td>
        <td>Key Features Overview</td>
        <td>Fotini (Greece)</td>
        <td>~30 sec</td>
        <td>Pass mic to <strong>Milena</strong></td>
      </tr>
      <tr>
        <td><strong>Slides 15-17</strong></td>
        <td>Why It Matters + Pricing + Helen Keller Quote</td>
        <td>Milena (Georgia)</td>
        <td>~75 sec total</td>
        <td>Pass mic to <strong>Anastasia</strong></td>
      </tr>
      <tr>
        <td><strong>Slide 18</strong></td>
        <td>Try It (Live QR Code & APK Download)</td>
        <td>Anastasia (Ukraine) / Abdelkader (Algeria)</td>
        <td>~25 sec</td>
        <td>Self ➔ Slide 19</td>
      </tr>
      <tr>
        <td><strong>Slide 19</strong></td>
        <td>Thank You & Hackathon Closing</td>
        <td>Abdelkader (Algeria) & Whole Team</td>
        <td>~25 sec</td>
        <td>Open Floor for Jury Q&A</td>
      </tr>
    </tbody>
  </table>

  <div class="footer-note avoid-break">
    <div>VirtuallyEdu • Erasmus+ Digital Hackathon — Project Baseera</div>
    <div>Page 1: Project Overview & Presentation Index</div>
  </div>

  <!-- ==================== PAGE 2: SCRIPT PART 1 (SLIDES 1 TO 5) ==================== -->
  <div class="page-break"></div>

  <div class="section-header">
    <div class="section-icon">1</div>
    <div class="section-title">Word-for-Word Speaker Script: Slides 1 to 5</div>
  </div>

  <!-- SLIDE 1 -->
  <div class="slide-card" style="border-left: 4px solid #0284C7;">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num">Slide 1</span>
        <span class="slide-title">Cover & Project Title</span>
      </div>
      <span class="slide-speaker badge badge-blue">Speaker: Abdelkader (Algeria) (~25s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">Exact Spoken Script:</div>
      <div class="script-text">
        "Good day everyone, honorable jury members, and fellow innovators. In an era where sensational headlines and emotional rumors travel six times faster than the truth, how do we empower everyday users to see clearly? Welcome to <strong>Baseera</strong> — our AI-powered Digital Literacy Coach designed to foster critical thinking before sharing."
      </div>
      <div class="transition-cue">
        <strong>Slide Transition Cue:</strong> "Let's take a quick look at what we'll cover today." <em>(Advance to Slide 2)</em>
      </div>
    </div>
  </div>

  <!-- SLIDE 2 -->
  <div class="slide-card" style="border-left: 4px solid #0284C7;">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num">Slide 2</span>
        <span class="slide-title">Table of Contents / Agenda</span>
      </div>
      <span class="slide-speaker badge badge-blue">Speaker: Abdelkader (Algeria) (~20s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">Exact Spoken Script:</div>
      <div class="script-text">
        "Our journey today is structured into four key chapters: First, understanding the psychological anatomy of misinformation. Second, introducing Baseera's core philosophy and workflow. Third, demonstrating the working mobile app with live screenshots. And finally, discussing our societal impact, business sustainability, and live interactive trial."
      </div>
      <div class="transition-cue">
        <strong>Slide Transition Cue:</strong> "Before we dive in, let me introduce our international team." <em>(Advance to Slide 3)</em>
      </div>
    </div>
  </div>

  <!-- SLIDE 3 -->
  <div class="slide-card" style="border-left: 4px solid #0284C7;">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num">Slide 3</span>
        <span class="slide-title">Meet the Team</span>
      </div>
      <span class="slide-speaker badge badge-blue">Speaker: Abdelkader (Algeria) (~25s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">Exact Spoken Script:</div>
      <div class="script-text">
        "Baseera was built by an agile, cross-cultural team united under the Erasmus+ VirtuallyEdu Hackathon: myself, Abdelkader from Algeria; Fotini from Greece; Anastasia from Ukraine; Azatuhi from Armenia; and Milena from Georgia. Together, we combine engineering, UX, education, and strategy. To break down the root problem, I now pass the floor to Azatuhi."
      </div>
      <div class="transition-cue">
        <strong>Handoff:</strong> Abdelkader gestures warmly to <strong>Azatuhi</strong>.
      </div>
    </div>
  </div>

  <!-- SLIDE 4 -->
  <div class="slide-card" style="border-left: 4px solid #D97706;">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num" style="background: #D97706;">Slide 4</span>
        <span class="slide-title">The Problem — Rapid Spread of Misinformation</span>
      </div>
      <span class="slide-speaker badge badge-amber">Speaker: Azatuhi (Armenia) (~25s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">Exact Spoken Script:</div>
      <div class="script-text">
        "Thank you, Abdelkader. Today's social media algorithms are optimized for viral engagement, not factual accuracy. Misinformation spreads uncontrollably across borders within minutes. By the time a rumor is debunked, hundreds of thousands of people have already internalized it as fact."
      </div>
      <div class="transition-cue">
        <strong>Slide Transition Cue:</strong> "Why does this happen so easily? It comes down to human emotion." <em>(Advance to Slide 5)</em>
      </div>
    </div>
  </div>

  <!-- SLIDE 5 -->
  <div class="slide-card" style="border-left: 4px solid #D97706;">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num" style="background: #D97706;">Slide 5</span>
        <span class="slide-title">The Problem — Emotional Reaction Before Verification</span>
      </div>
      <span class="slide-speaker badge badge-amber">Speaker: Azatuhi (Armenia) (~25s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">Exact Spoken Script:</div>
      <div class="script-text">
        "Sensational content is intentionally engineered to hijack our emotions: fear, anger, outrage, and moral panic. When we feel intense emotion, our critical thinking reflex temporarily shuts down. People hit 'Share' in a fraction of a second — reacting with feelings rather than verifying facts."
      </div>
      <div class="transition-cue">
        <strong>Slide Transition Cue:</strong> "And existing solutions fail to stop this." <em>(Advance to Slide 6)</em>
      </div>
    </div>
  </div>

  <div class="footer-note avoid-break">
    <div>VirtuallyEdu • Erasmus+ Digital Hackathon — Project Baseera</div>
    <div>Page 2: Presentation Script (Slides 1 to 5)</div>
  </div>

  <!-- ==================== PAGE 3: SCRIPT PART 2 (SLIDES 6 TO 10) ==================== -->
  <div class="page-break"></div>

  <div class="section-header">
    <div class="section-icon">2</div>
    <div class="section-title">Word-for-Word Speaker Script: Slides 6 to 10</div>
  </div>

  <!-- SLIDE 6 -->
  <div class="slide-card" style="border-left: 4px solid #D97706;">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num" style="background: #D97706;">Slide 6</span>
        <span class="slide-title">The Problem — Lack of Interactive Educational Tools</span>
      </div>
      <span class="slide-speaker badge badge-amber">Speaker: Azatuhi (Armenia) (~25s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">Exact Spoken Script:</div>
      <div class="script-text">
        "Traditional fact-checking websites are passive, text-heavy, and operate post-mortem — long after the damage is done. There is a critical lack of modern, interactive educational tools that train users in real time. We don't just need more fact sheets; we need a daily coach. Here to present our solution is Fotini."
      </div>
      <div class="transition-cue">
        <strong>Handoff:</strong> Azatuhi passes the microphone to <strong>Fotini</strong>.
      </div>
    </div>
  </div>

  <!-- SLIDE 7 -->
  <div class="slide-card" style="border-left: 4px solid #059669;">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num" style="background: #059669;">Slide 7</span>
        <span class="slide-title">The Solution: Baseera</span>
      </div>
      <span class="slide-speaker badge badge-emerald">Speaker: Fotini (Greece) (~30s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">Exact Spoken Script:</div>
      <div class="script-text">
        "Thank you, Azatuhi. Meet <strong>Baseera</strong>. Baseera represents insight and clear vision. Our core philosophy is radically different: <em>Baseera does not judge content or tell you what to believe</em>. It works as an AI coach that turns whatever you want to share into a question, not a verdict — helping you build the lifelong habit of verifying before you trust. Now, Abdelkader will walk us through exactly how it works in practice."
      </div>
      <div class="transition-cue">
        <strong>Handoff:</strong> Fotini passes the microphone back to <strong>Abdelkader</strong>.
      </div>
    </div>
  </div>

  <!-- SLIDE 8 -->
  <div class="slide-card" style="border-left: 4px solid #0284C7;">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num">Slide 8</span>
        <span class="slide-title">How It Works — Step 1: Share</span>
      </div>
      <span class="slide-speaker badge badge-blue">Speaker: Abdelkader (Algeria) (~20s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">Exact Spoken Script:</div>
      <div class="script-text">
        "Thank you, Fotini. How does Baseera work in everyday life? It begins with <strong>Step 1: Share</strong>. Whenever you encounter a provocative news article, a WhatsApp message, or an image on social media, you simply paste the link or upload the screenshot directly into Baseera."
      </div>
      <div class="transition-cue">
        <strong>Slide Transition Cue:</strong> "Once submitted, the AI engine takes over." <em>(Advance to Slide 9)</em>
      </div>
    </div>
  </div>

  <!-- SLIDE 9 -->
  <div class="slide-card" style="border-left: 4px solid #0284C7;">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num">Slide 9</span>
        <span class="slide-title">How It Works — Step 2: Analyze</span>
      </div>
      <span class="slide-speaker badge badge-blue">Speaker: Abdelkader (Algeria) (~20s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">Exact Spoken Script:</div>
      <div class="script-text">
        "<strong>Step 2 is Analyze</strong>. Our AI engine instantly evaluates the content across three vectors: linguistic emotional bias, sensational urgency, and source credibility — cross-referencing over 280 peer-reviewed archives and trusted verification networks."
      </div>
      <div class="transition-cue">
        <strong>Slide Transition Cue:</strong> "Then comes our secret sauce: Reflection." <em>(Advance to Slide 10)</em>
      </div>
    </div>
  </div>

  <!-- SLIDE 10 -->
  <div class="slide-card" style="border-left: 4px solid #0284C7;">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num">Slide 10</span>
        <span class="slide-title">How It Works — Step 3: Reflect</span>
      </div>
      <span class="slide-speaker badge badge-blue">Speaker: Abdelkader (Algeria) (~25s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">Exact Spoken Script:</div>
      <div class="script-text">
        "<strong>Step 3 is Reflect</strong>. Instead of giving a dry label like 'Fake', Baseera poses a tailored Socratic question, such as: <em>'Did this article cite a primary source before making this urgent claim?'</em> Combined with a 20-second cognitive pause timer, it breaks the impulsive cycle and gives your brain time to reason."
      </div>
      <div class="transition-cue">
        <strong>Slide Transition Cue:</strong> "And the outcome is long-term growth." <em>(Advance to Slide 11)</em>
      </div>
    </div>
  </div>

  <div class="footer-note avoid-break">
    <div>VirtuallyEdu • Erasmus+ Digital Hackathon — Project Baseera</div>
    <div>Page 3: Presentation Script (Slides 6 to 10)</div>
  </div>

  <!-- ==================== PAGE 4: SCRIPT PART 3 (SLIDES 11 TO 15) ==================== -->
  <div class="page-break"></div>

  <div class="section-header">
    <div class="section-icon">3</div>
    <div class="section-title">Word-for-Word Speaker Script: Slides 11 to 15</div>
  </div>

  <!-- SLIDE 11 -->
  <div class="slide-card" style="border-left: 4px solid #0284C7;">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num">Slide 11</span>
        <span class="slide-title">How It Works — Step 4: Grow</span>
      </div>
      <span class="slide-speaker badge badge-blue">Speaker: Abdelkader (Algeria) (~20s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">Exact Spoken Script:</div>
      <div class="script-text">
        "<strong>Step 4 is Grow</strong>. Baseera tracks your weekly progress with a Digital Resilience Index. Each time you question an emotional trigger, your critical thinking reflex strengthens. Now, Anastasia will guide you through the live screens of our application."
      </div>
      <div class="transition-cue">
        <strong>Handoff:</strong> Abdelkader passes the microphone to <strong>Anastasia</strong>.
      </div>
    </div>
  </div>

  <!-- SLIDE 12 -->
  <div class="slide-card" style="border-left: 4px solid #7C3AED;">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num" style="background: #7C3AED;">Slide 12</span>
        <span class="slide-title">Screens Demo — Part 1 (Onboarding & Dashboard)</span>
      </div>
      <span class="slide-speaker badge badge-purple">Speaker: Anastasia (Ukraine) (~30s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">Exact Spoken Script:</div>
      <div class="script-text">
        "Thank you, Abdelkader. Let's experience Baseera firsthand. As users open the app, they are welcomed by our brand Splash and an interactive 3-step Onboarding that establishes conscious sharing habits. On the Home Dashboard, users immediately see their Weekly Habit Score — currently at 88% — and one-tap access to 'Analyze Content' or perform a 'Privacy Scan'."
      </div>
      <div class="transition-cue">
        <strong>Slide Transition Cue:</strong> "Let's see what happens when we submit a post." <em>(Advance to Slide 13)</em>
      </div>
    </div>
  </div>

  <!-- SLIDE 13 -->
  <div class="slide-card" style="border-left: 4px solid #7C3AED;">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num" style="background: #7C3AED;">Slide 13</span>
        <span class="slide-title">Screens Demo — Part 2 (Result & Privacy Shield)</span>
      </div>
      <span class="slide-speaker badge badge-purple">Speaker: Anastasia (Ukraine) (~35s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">Exact Spoken Script:</div>
      <div class="script-text">
        "When content is submitted, our Processing screen displays real-time critical thinking tips. The Result screen highlights an Emotional Bias Gauge at 78% with the Socratic question and links to Reuters and AP. Furthermore, our Privacy Shield inspects photos, automatically strips hidden GPS metadata, and allows users to blur bystander faces and street signs with a single tap before sharing."
      </div>
      <div class="transition-cue">
        <strong>Handoff:</strong> Anastasia passes to <strong>Fotini</strong> for Key Features.
      </div>
    </div>
  </div>

  <!-- SLIDE 14 -->
  <div class="slide-card" style="border-left: 4px solid #059669;">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num" style="background: #059669;">Slide 14</span>
        <span class="slide-title">Key Features</span>
      </div>
      <span class="slide-speaker badge badge-emerald">Speaker: Fotini (Greece) (~30s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">Exact Spoken Script:</div>
      <div class="script-text">
        "Thank you, Anastasia. To recap our competitive edge, Baseera provides five essential pillars: <strong>1) Multi-modal AI Content Analysis</strong> for text and imagery. <strong>2) On-Device Privacy Scanning</strong> with face blurring. <strong>3) The Socratic Inquiry Engine</strong>. <strong>4) Direct Fact-Audit verification</strong>. And <strong>5) Cognitive Pause habit building</strong>. Now, Milena will present why Baseera matters and our roadmap."
      </div>
      <div class="transition-cue">
        <strong>Handoff:</strong> Fotini passes the microphone to <strong>Milena</strong>.
      </div>
    </div>
  </div>

  <!-- SLIDE 15 -->
  <div class="slide-card" style="border-left: 4px solid #E11D48;">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num" style="background: #E11D48;">Slide 15</span>
        <span class="slide-title">Why Baseera Matters</span>
      </div>
      <span class="slide-speaker badge badge-rose">Speaker: Milena (Georgia) (~25s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">Exact Spoken Script:</div>
      <div class="script-text">
        "Thank you, Fotini. Why does Baseera matter right now? In our polarized digital climate, media literacy is no longer just a soft skill — it is civic defense. Generative AI makes synthetic media trivial to produce. By training youth and citizens to question emotional stimuli, Baseera protects democratic discourse, mental wellbeing, and personal privacy."
      </div>
      <div class="transition-cue">
        <strong>Slide Transition Cue:</strong> "Let's examine how we sustain and scale this impact." <em>(Advance to Slide 16)</em>
      </div>
    </div>
  </div>

  <div class="footer-note avoid-break">
    <div>VirtuallyEdu • Erasmus+ Digital Hackathon — Project Baseera</div>
    <div>Page 4: Presentation Script (Slides 11 to 15)</div>
  </div>

  <!-- ==================== PAGE 5: SCRIPT PART 4 (SLIDES 16 TO 19 & Q&A) ==================== -->
  <div class="page-break"></div>

  <div class="section-header">
    <div class="section-icon">4</div>
    <div class="section-title">Word-for-Word Speaker Script: Slides 16 to 19 & Q&A</div>
  </div>

  <!-- SLIDE 16 -->
  <div class="slide-card" style="border-left: 4px solid #E11D48;">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num" style="background: #E11D48;">Slide 16</span>
        <span class="slide-title">Pricing Plans & Sustainability</span>
      </div>
      <span class="slide-speaker badge badge-rose">Speaker: Milena (Georgia) (~25s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">Exact Spoken Script:</div>
      <div class="script-text">
        "We designed a sustainable freemium model: <strong>Baseera Free</strong> gives individual users unlimited core checks. <strong>Baseera Edu</strong> offers schools and universities classroom analytics, lesson integration, and habit dashboards. And <strong>Baseera Enterprise</strong> provides journalists and NGOs with bulk verification tools and deep privacy protection."
      </div>
      <div class="transition-cue">
        <strong>Slide Transition Cue:</strong> "Allow me to leave you with a timeless thought." <em>(Advance to Slide 17)</em>
      </div>
    </div>
  </div>

  <!-- SLIDE 17 -->
  <div class="slide-card" style="border-left: 4px solid #E11D48;">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num" style="background: #E11D48;">Slide 17</span>
        <span class="slide-title">Final Thought (Helen Keller Quote)</span>
      </div>
      <span class="slide-speaker badge badge-rose">Speaker: Milena (Georgia) (~25s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">Exact Spoken Script:</div>
      <div class="script-text">
        "Helen Keller famously wrote: <em>'Life is either a daring adventure or nothing at all.'</em> In the vast digital frontier, building the courage to think for ourselves, to pause, and to seek the truth is our great adventure. Baseera is here to guide that journey."
      </div>
      <div class="transition-cue">
        <strong>Handoff:</strong> Milena passes to <strong>Anastasia</strong> (or Abdelkader) for the live trial.
      </div>
    </div>
  </div>

  <!-- SLIDE 18 -->
  <div class="slide-card" style="border: 2px solid #0284C7; border-left: 5px solid #0284C7;">
    <div class="slide-card-header" style="background: #F0F9FF;">
      <div class="slide-meta">
        <span class="slide-num" style="background: #0284C7;">Slide 18</span>
        <span class="slide-title" style="color: #0369A1;">Try It — Live QR Code & APK</span>
      </div>
      <span class="slide-speaker badge badge-purple">Speaker: Anastasia (Ukraine) / Abdelkader (Algeria) (~25s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">Exact Spoken Script:</div>
      <div class="script-text">
        "Now that you have seen what Baseera can do, we invite you to experience it right now on your own devices! Please scan the QR code displayed on your screen to download our Android APK or launch our responsive web application. Test any link or image you want — the AI coach is ready for you!"
      </div>
      <div class="transition-cue">
        <strong>Slide Transition Cue:</strong> "And with that, we conclude our presentation." <em>(Advance to Slide 19)</em>
      </div>
    </div>
  </div>

  <!-- SLIDE 19 -->
  <div class="slide-card" style="border: 2px solid #0F172A; border-left: 5px solid #0F172A;">
    <div class="slide-card-header" style="background: #0F172A; color: #FFFFFF;">
      <div class="slide-meta">
        <span class="slide-num" style="background: #0284C7;">Slide 19</span>
        <span class="slide-title" style="color: #FFFFFF;">Thank You & Hackathon Closing</span>
      </div>
      <span class="slide-speaker badge badge-dark" style="border: 1px solid #475569;">Speaker: Abdelkader (Algeria) (Closing & All Team Q&A) (~25s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">Exact Spoken Script:</div>
      <div class="script-text">
        "Thank you so much to our mentors, the Erasmus+ Digital Hackathon jury, and the VirtuallyEdu organization. At Baseera, our motto will always be: <strong>'Teaching minds to doubt, not machines to decide.'</strong> Our entire international team is now here and eager to answer your questions!"
      </div>
      <div class="transition-cue">
        <strong>Closing Action:</strong> All team members smile, step forward, and open the floor for jury Q&A.
      </div>
    </div>
  </div>

  <!-- QR & DOWNLOAD ACCESS -->
  <div class="qr-container avoid-break">
    <img src="{img_qr}" class="qr-image" alt="Baseera App QR Code">
    <div class="qr-details">
      <h4>Install Baseera on Android / Test Live</h4>
      <p>Scan this QR code to download the standalone <strong>baseera.apk</strong> (built with Capacitor & React). Direct APK file is pre-configured and tested.</p>
      <a href="https://www.mediafire.com/file/ppu23zjxboczhhf/baseera.apk/file" class="download-link">Download APK directly: mediafire.com/file/ppu23zjxboczhhf/baseera.apk</a>
      <div style="font-size: 8.5px; color: #64748B; margin-top: 3px;">Local APK: C:\\Users\\CORTEC\\Downloads\\Erasmus\\baseera\\baseera.apk</div>
    </div>
  </div>

  <div class="footer-note avoid-break">
    <div>VirtuallyEdu • Erasmus+ Digital Hackathon — Project Baseera</div>
    <div>Page 5: Presentation Script (Slides 16 to 19 & Q&A)</div>
  </div>

  <!-- ==================== PAGE 6: SCREENS 1 TO 4 ==================== -->
  <div class="page-break"></div>

  <div class="section-header">
    <div class="section-icon">5</div>
    <div class="section-title">Visual Screen Reference: Boot & Onboarding (Screens 1 to 4)</div>
  </div>

  <div class="screens-grid">
    <!-- Screen 1: Splash -->
    <div class="screen-card">
      <div class="screen-img-wrap">
        <img src="{img_splash}" class="screen-img" alt="Splash Screen">
      </div>
      <div class="screen-info">
        <div class="screen-number">Screen 01</div>
        <div class="screen-heading">Splash & Boot</div>
        <div class="screen-desc">First impression upon launch. Showcases the Baseera branding, eye insignia, and smooth loading animation before routing.</div>
        <ul class="screen-bullets">
          <li>Baseera brand mark & slogan</li>
          <li>Hardware & offline engine checks</li>
          <li>Instant 2-second transition</li>
        </ul>
      </div>
    </div>

    <!-- Screen 2: Onboarding 1 -->
    <div class="screen-card">
      <div class="screen-img-wrap">
        <img src="{img_onboard1}" class="screen-img" alt="Onboarding 1">
      </div>
      <div class="screen-info">
        <div class="screen-number">Screen 02</div>
        <div class="screen-heading">Share with Intention</div>
        <div class="screen-desc">First onboarding slide setting the behavioral mindset. Inspires users to pause before reflexively passing content forward.</div>
        <ul class="screen-bullets">
          <li>Mindful sharing principle</li>
          <li>Interactive pagination indicator</li>
          <li>Quick Skip / Next controls</li>
        </ul>
      </div>
    </div>

    <!-- Screen 3: Onboarding 2 -->
    <div class="screen-card">
      <div class="screen-img-wrap">
        <img src="{img_onboard2}" class="screen-img" alt="Onboarding 2">
      </div>
      <div class="screen-info">
        <div class="screen-number">Screen 03</div>
        <div class="screen-heading">AI-Powered Analysis</div>
        <div class="screen-desc">Demonstrates how the AI inspects framing bias, emotional language intensity, and cross-references original sources.</div>
        <ul class="screen-bullets">
          <li>Cognitive bias deconstruction</li>
          <li>Linguistic trigger flags</li>
          <li>Multi-tier fact-checking</li>
        </ul>
      </div>
    </div>

    <!-- Screen 4: Onboarding 3 -->
    <div class="screen-card">
      <div class="screen-img-wrap">
        <img src="{img_onboard3}" class="screen-img" alt="Onboarding 3">
      </div>
      <div class="screen-info">
        <div class="screen-number">Screen 04</div>
        <div class="screen-heading">Cultivate Critical Thinking</div>
        <div class="screen-desc">Explains the habit-building methodology. Baseera is a companion that sharpens the user's natural instincts.</div>
        <ul class="screen-bullets">
          <li>Habit formation tracking</li>
          <li>Resilience index progress</li>
          <li>Direct CTA to Start Experience</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="footer-note avoid-break">
    <div>VirtuallyEdu • Erasmus+ Digital Hackathon — Project Baseera</div>
    <div>Page 6: Visual Reference (Screens 1 to 4)</div>
  </div>

  <!-- ==================== PAGE 7: SCREENS 5 TO 8 ==================== -->
  <div class="page-break"></div>

  <div class="section-header">
    <div class="section-icon">6</div>
    <div class="section-title">Visual Screen Reference: App Core & Socratic Result (Screens 5 to 8)</div>
  </div>

  <div class="screens-grid">
    <!-- Screen 5: Home Dashboard -->
    <div class="screen-card">
      <div class="screen-img-wrap">
        <img src="{img_home}" class="screen-img" alt="Home Dashboard">
      </div>
      <div class="screen-info">
        <div class="screen-number">Screen 05</div>
        <div class="screen-heading">Home Dashboard</div>
        <div class="screen-desc">User control hub featuring personal greeting, weekly summary metrics (12 items analyzed, 88% habit score), and quick-action hero card.</div>
        <ul class="screen-bullets">
          <li>"Paste Link or Media" quick trigger</li>
          <li>Privacy Scan & Fact History cards</li>
          <li>Recent observation log & indicators</li>
          <li>Bottom navigation bar</li>
        </ul>
      </div>
    </div>

    <!-- Screen 6: Share Input -->
    <div class="screen-card">
      <div class="screen-img-wrap">
        <img src="{img_share}" class="screen-img" alt="Share Input Screen">
      </div>
      <div class="screen-info">
        <div class="screen-number">Screen 06</div>
        <div class="screen-heading">Content Input & Scope</div>
        <div class="screen-desc">Dedicated intake terminal for multimedia. Supports URL pastes, gallery image uploads, and clipboard auto-detection.</div>
        <ul class="screen-bullets">
          <li>Drag-and-drop media intake</li>
          <li>Active modules: Bias, Fact, Deepfake</li>
          <li>Truth Protocol: 280+ peer sources</li>
          <li>End-to-end encrypted note</li>
        </ul>
      </div>
    </div>

    <!-- Screen 7: Processing Screen -->
    <div class="screen-card">
      <div class="screen-img-wrap">
        <img src="{img_processing}" class="screen-img" alt="Processing Screen">
      </div>
      <div class="screen-info">
        <div class="screen-number">Screen 07</div>
        <div class="screen-heading">AI Processing Engine</div>
        <div class="screen-desc">Transparent processing state keeping users engaged. Displays exact analysis steps and educational literacy tips while evaluating.</div>
        <ul class="screen-bullets">
          <li>Step 2 of 4 context verifier</li>
          <li>Animated progress tracker</li>
          <li>Educational "Critical Mindset" tips</li>
          <li>Encrypted analysis badge</li>
        </ul>
      </div>
    </div>

    <!-- Screen 8: Result Screen -->
    <div class="screen-card">
      <div class="screen-img-wrap">
        <img src="{img_result}" class="screen-img" alt="Result Screen">
      </div>
      <div class="screen-info">
        <div class="screen-number">Screen 08</div>
        <div class="screen-heading">Socratic Result & Pause</div>
        <div class="screen-desc">The core value screen. Features the Emotional Bias Gauge (78%), a guiding Socratic reflection question, and a 20-second cognitive pause timer.</div>
        <ul class="screen-bullets">
          <li>Emotional Urgency classification</li>
          <li>Reflection question: "Did post show reliable source?"</li>
          <li>20s pause with psychological insight</li>
          <li>Verified links (Reuters, AP, WHO)</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="footer-note avoid-break">
    <div>VirtuallyEdu • Erasmus+ Digital Hackathon — Project Baseera</div>
    <div>Page 7: Visual Reference (Screens 5 to 8)</div>
  </div>

  <!-- ==================== PAGE 8: SCREEN 9 & ARCHITECTURE ==================== -->
  <div class="page-break"></div>

  <div class="section-header">
    <div class="section-icon">7</div>
    <div class="section-title">Screen 9: Privacy Inspection & Technical Architecture</div>
  </div>

  <!-- Screen 9: Privacy Screen -->
  <div class="card avoid-break" style="margin-top: 8px; padding: 10px 12px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px;">
    <div style="display: flex; gap: 12px;">
      <div class="screen-img-wrap" style="flex: 0 0 85px; height: 160px;">
        <img src="{img_privacy}" class="screen-img" alt="Privacy Screen">
      </div>
      <div style="flex: 1;">
        <div class="screen-number">Screen 09</div>
        <div class="screen-heading">Privacy Inspection & Anonymizer</div>
        <div class="screen-desc" style="font-size: 10.5px; color: #475569; margin-bottom: 6px;">
          Empowers users to safeguard personal and bystanders' privacy before publishing photos. Inspects images for sensitive landmarks, unconsenting faces, and metadata leaks.
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-top: 4px;">
          <div style="background: #F1F5F9; padding: 6px 8px; border-radius: 6px; font-size: 9.5px;">
            <strong>Street & Geo Signs:</strong> Storefronts & street names detected → One-click <em>Mask</em>.
          </div>
          <div style="background: #F1F5F9; padding: 6px 8px; border-radius: 6px; font-size: 9.5px;">
            <strong>Bystander Faces:</strong> 2 faces identified in background → One-click <em>Blur All</em>.
          </div>
          <div style="background: #F1F5F9; padding: 6px 8px; border-radius: 6px; font-size: 9.5px;">
            <strong>EXIF GPS Tags:</strong> Precise latitude/longitude coordinates → <em>Auto-Removed</em>.
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="section-header avoid-break" style="margin-top: 14px;">
    <div class="section-icon">⚙</div>
    <div class="section-title">Technical Architecture & Stack</div>
  </div>

  <table class="avoid-break">
    <thead>
      <tr>
        <th style="width: 25%;">Layer</th>
        <th style="width: 35%;">Technology</th>
        <th style="width: 40%;">Role in Baseera</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Mobile App Shell</strong></td>
        <td>Capacitor 7.x & Android Native APK</td>
        <td>Cross-platform runtime, native filesystem access, direct offline readiness.</td>
      </tr>
      <tr>
        <td><strong>User Interface</strong></td>
        <td>React 18, TypeScript, Tailwind CSS, Lucide Icons</td>
        <td>Ultra-fast, accessible, responsive component library with glassmorphic dark/light aesthetics.</td>
      </tr>
      <tr>
        <td><strong>AI Inference Core</strong></td>
        <td>Groq Cloud API (Qwen 2.5 32B / Llama 3.3) & Gemini Vision</td>
        <td>Sub-second natural language analysis, bias scoring, and multimodal vision verification.</td>
      </tr>
      <tr>
        <td><strong>State & Privacy</strong></td>
        <td>Client-side local storage + zero-cloud retention</td>
        <td>Encrypted scans executed client-side; no user telemetry or personal images retained.</td>
      </tr>
    </tbody>
  </table>

  <div class="footer-note avoid-break">
    <div>VirtuallyEdu • Erasmus+ Digital Hackathon — Project Baseera</div>
    <div>Page 8: Privacy Shield & Technical Specifications</div>
  </div>

</body>
</html>
"""

temp_dir = tempfile.mkdtemp()
html_file = os.path.join(temp_dir, "baseera_guide.html")
pdf_dest1 = r"C:\Users\CORTEC\Downloads\Erasmus\Baseera_Project_and_Presentation_Guide.pdf"
pdf_dest2 = r"C:\Users\CORTEC\Downloads\Baseera_Project_and_Presentation_Guide.pdf"

with open(html_file, "w", encoding="utf-8") as f:
    f.write(html_content)

edge_exe = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
cmd = [
    edge_exe,
    "--headless=new",
    "--disable-gpu",
    "--user-data-dir=" + os.path.join(temp_dir, "ud"),
    "--print-to-pdf=" + pdf_dest1,
    "--no-pdf-header-footer",
    html_file
]

print("Generating 100% English PDF...")
res = subprocess.run(cmd, capture_output=True, text=True)
print("Return code:", res.returncode)

if os.path.exists(pdf_dest1):
    import shutil
    shutil.copy2(pdf_dest1, pdf_dest2)
    print(f"Success! 100% English PDF generated at {pdf_dest1} (size: {os.path.getsize(pdf_dest1):,} bytes)")
    print(f"Also copied to {pdf_dest2}")
else:
    print("Error generating PDF:", res.stderr)
