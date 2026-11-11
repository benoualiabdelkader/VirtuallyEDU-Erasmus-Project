import os
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
<title>Baseera — Project & Slide-by-Slide Presentation Guide</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

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
    font-size: 12px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }}

  .page-break {{
    page-break-before: always;
  }}

  .avoid-break {{
    page-break-inside: avoid;
  }}

  /* Cover Banner */
  .cover {{
    background: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0369A1 100%);
    color: #FFFFFF;
    padding: 26px 24px;
    border-radius: 14px;
    margin-bottom: 18px;
    box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.2);
  }}

  .cover-tag {{
    display: inline-block;
    background: rgba(14, 165, 233, 0.25);
    color: #38BDF8;
    border: 1px solid rgba(56, 189, 248, 0.4);
    padding: 3px 10px;
    border-radius: 9999px;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }}

  .cover-title {{
    font-size: 26px;
    font-weight: 800;
    letter-spacing: -0.5px;
    margin-bottom: 4px;
    color: #FFFFFF;
  }}

  .cover-subtitle {{
    font-size: 13px;
    color: #94A3B8;
    font-weight: 500;
    margin-bottom: 12px;
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
    gap: 8px;
  }}

  .team-card {{
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 8px;
    padding: 8px 6px;
    text-align: center;
  }}

  .team-name {{
    font-weight: 700;
    font-size: 11.5px;
    color: #F8FAFC;
  }}

  .team-country {{
    font-size: 10px;
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
    margin: 16px 0 10px 0;
    padding-bottom: 5px;
    border-bottom: 2px solid #E2E8F0;
  }}

  .section-icon {{
    background: #0284C7;
    color: white;
    width: 22px;
    height: 22px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 11.5px;
  }}

  .section-title {{
    font-size: 15px;
    font-weight: 800;
    color: #0F172A;
    letter-spacing: -0.3px;
  }}

  .badge {{
    display: inline-block;
    padding: 2px 7px;
    border-radius: 5px;
    font-size: 9.5px;
    font-weight: 700;
    text-transform: uppercase;
  }}

  .badge-blue {{ background: #E0F2FE; color: #0284C7; }}
  .badge-emerald {{ background: #D1FAE5; color: #059669; }}
  .badge-amber {{ background: #FEF3C7; color: #D97706; }}
  .badge-purple {{ background: #F3E8FF; color: #7C3AED; }}
  .badge-rose {{ background: #FFE4E6; color: #E11D48; }}
  .badge-dark {{ background: #0F172A; color: #F8FAFC; }}

  /* Slide Script Cards */
  .slide-card {{
    background: #FFFFFF;
    border: 1px solid #CBD5E1;
    border-radius: 8px;
    margin-bottom: 10px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    page-break-inside: avoid;
  }}

  .slide-card-header {{
    background: #F8FAFC;
    border-bottom: 1px solid #E2E8F0;
    padding: 6px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }}

  .slide-meta {{
    display: flex;
    align-items: center;
    gap: 8px;
  }}

  .slide-num {{
    background: #0F172A;
    color: #FFFFFF;
    font-size: 10px;
    font-weight: 800;
    padding: 2px 6px;
    border-radius: 4px;
  }}

  .slide-title {{
    font-size: 12px;
    font-weight: 700;
    color: #0F172A;
  }}

  .slide-speaker {{
    font-size: 10.5px;
    font-weight: 700;
  }}

  .slide-body {{
    padding: 8px 12px;
  }}

  .script-label {{
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #64748B;
    margin-bottom: 3px;
  }}

  .script-text {{
    font-size: 11.5px;
    color: #1E293B;
    line-height: 1.5;
    background: #F8FAFC;
    border-left: 3px solid #0284C7;
    padding: 6px 10px;
    border-radius: 0 6px 6px 0;
    margin-bottom: 6px;
  }}

  .transition-cue {{
    font-size: 10px;
    color: #0369A1;
    background: #F0F9FF;
    border: 1px dashed #BAE6FD;
    padding: 4px 8px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
  }}

  /* Screens display grid */
  .screens-grid {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 6px;
  }}

  .screen-card {{
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    padding: 8px;
    display: flex;
    gap: 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    page-break-inside: avoid;
  }}

  .screen-img-wrap {{
    flex: 0 0 85px;
    height: 160px;
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
    font-size: 9px;
    font-weight: 700;
    color: #0284C7;
    text-transform: uppercase;
  }}

  .screen-heading {{
    font-size: 11.5px;
    font-weight: 700;
    color: #0F172A;
    margin-bottom: 3px;
  }}

  .screen-desc {{
    font-size: 10px;
    color: #475569;
    line-height: 1.4;
  }}

  .screen-bullets {{
    margin-top: 3px;
    list-style: none;
  }}

  .screen-bullets li {{
    font-size: 9px;
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
    margin-top: 10px;
  }}

  .qr-image {{
    width: 90px;
    height: 90px;
    border-radius: 6px;
    background: #FFFFFF;
    padding: 5px;
  }}

  .qr-details h4 {{
    font-size: 12.5px;
    font-weight: 700;
    color: #0369A1;
    margin-bottom: 2px;
  }}

  .qr-details p {{
    font-size: 10.5px;
    color: #334155;
    margin-bottom: 4px;
  }}

  .download-link {{
    display: inline-block;
    background: #0284C7;
    color: #FFFFFF;
    padding: 3px 10px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 600;
    text-decoration: none;
  }}

  .footer-note {{
    margin-top: 18px;
    padding-top: 8px;
    border-top: 1px solid #E2E8F0;
    display: flex;
    justify-content: space-between;
    font-size: 9px;
    color: #94A3B8;
  }}
</style>
</head>
<body>

  <!-- PAGE 1: COVER & EXECUTIVE OVERVIEW -->
  <div class="cover">
    <div class="cover-tag">VirtuallyEdu • Erasmus+ Digital Hackathon</div>
    <div class="cover-title">Baseera (بصيرة)</div>
    <div class="cover-subtitle">AI-Powered Digital Literacy & Critical Thinking Coach</div>
    <div class="cover-motto">"Teaching minds to doubt, not machines to decide."</div>

    <div class="team-grid">
      <div class="team-card">
        <div class="team-name">Abdelkader</div>
        <div class="team-country">Algeria 🇩🇿</div>
        <div class="team-slides">Slides 1-3, 8-11, 19</div>
      </div>
      <div class="team-card">
        <div class="team-name">Azatuhi</div>
        <div class="team-country">Armenia 🇦🇲</div>
        <div class="team-slides">Slides 4-6 (The Problem)</div>
      </div>
      <div class="team-card">
        <div class="team-name">Fotini</div>
        <div class="team-country">Greece 🇬🇷</div>
        <div class="team-slides">Slides 7, 14 (Solution & Features)</div>
      </div>
      <div class="team-card">
        <div class="team-name">Anastasia</div>
        <div class="team-country">Ukraine 🇺🇦</div>
        <div class="team-slides">Slides 12-13, 18 (Demo & Try It)</div>
      </div>
      <div class="team-card">
        <div class="team-name">Milena</div>
        <div class="team-country">Georgia 🇬🇪</div>
        <div class="team-slides">Slides 15-17 (Impact & Plans)</div>
      </div>
    </div>
  </div>

  <div class="section-header">
    <div class="section-icon">1</div>
    <div class="section-title">Presentation Slide-by-Slide Script — Part 1 (Slides 1 to 7)</div>
  </div>

  <!-- SLIDE 1 -->
  <div class="slide-card">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num">Slide 1</span>
        <span class="slide-title">Cover & Project Title</span>
      </div>
      <span class="slide-speaker badge badge-blue">Speaker: Abdelkader 🇩🇿 (~25s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">What to say (Spoken Script):</div>
      <div class="script-text">
        "Good day everyone, honorable jury members and fellow innovators. In an era where sensational headlines and misleading content travel six times faster than the truth, how do we empower people to see clearly? Welcome to <strong>Baseera</strong> — our AI-powered Digital Literacy Coach designed to foster critical thinking before sharing."
      </div>
      <div class="transition-cue">
        🔄 <strong>Next:</strong> "Let's take a quick look at what we'll cover today." <em>(Advance to Slide 2)</em>
      </div>
    </div>
  </div>

  <!-- SLIDE 2 -->
  <div class="slide-card">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num">Slide 2</span>
        <span class="slide-title">Table of Contents / Agenda</span>
      </div>
      <span class="slide-speaker badge badge-blue">Speaker: Abdelkader 🇩🇿 (~20s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">What to say (Spoken Script):</div>
      <div class="script-text">
        "Our journey today is structured into four key chapters: First, understanding the psychological anatomy of misinformation. Second, introducing Baseera's core philosophy and workflow. Third, demonstrating the working mobile app with live screenshots. And finally, discussing our societal impact, pricing, and live interactive trial."
      </div>
      <div class="transition-cue">
        🔄 <strong>Next:</strong> "Before we dive in, let me introduce our international team." <em>(Advance to Slide 3)</em>
      </div>
    </div>
  </div>

  <!-- SLIDE 3 -->
  <div class="slide-card">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num">Slide 3</span>
        <span class="slide-title">Meet the Team</span>
      </div>
      <span class="slide-speaker badge badge-blue">Speaker: Abdelkader 🇩🇿 (~25s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">What to say (Spoken Script):</div>
      <div class="script-text">
        "Baseera was created by an agile, cross-cultural team united under the Erasmus+ VirtuallyEdu Hackathon: myself, Abdelkader from Algeria; Fotini from Greece; Anastasia from Ukraine; Azatuhi from Armenia; and Milena from Georgia. Together, we combine engineering, UX, education, and strategy. To break down the root problem, I now pass the floor to Azatuhi."
      </div>
      <div class="transition-cue">
        🎤 <strong>Handoff:</strong> Abdelkader passes the microphone to <strong>Azatuhi</strong>.
      </div>
    </div>
  </div>

  <!-- SLIDE 4 -->
  <div class="slide-card">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num">Slide 4</span>
        <span class="slide-title">The Problem — Rapid Spread of Misinformation</span>
      </div>
      <span class="slide-speaker badge badge-amber">Speaker: Azatuhi 🇦🇲 (~25s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">What to say (Spoken Script):</div>
      <div class="script-text">
        "Thank you, Abdelkader. Today's social media algorithms are optimized for viral engagement, not factual accuracy. Misinformation spreads uncontrollably across borders within minutes. By the time a rumor is debunked, hundreds of thousands of people have already internalized it as fact."
      </div>
      <div class="transition-cue">
        🔄 <strong>Next:</strong> "Why does this happen so easily? It comes down to human emotion." <em>(Advance to Slide 5)</em>
      </div>
    </div>
  </div>

  <!-- SLIDE 5 -->
  <div class="slide-card">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num">Slide 5</span>
        <span class="slide-title">The Problem — Emotional Reaction Before Verification</span>
      </div>
      <span class="slide-speaker badge badge-amber">Speaker: Azatuhi 🇦🇲 (~25s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">What to say (Spoken Script):</div>
      <div class="script-text">
        "Sensational content is intentionally engineered to hijack our emotions: fear, anger, outrage, and moral panic. When we feel intense emotion, our critical thinking reflex temporarily shuts down. People hit 'Share' in a fraction of a second — reacting with feelings rather than verifying facts."
      </div>
      <div class="transition-cue">
        🔄 <strong>Next:</strong> "And existing solutions fail to stop this." <em>(Advance to Slide 6)</em>
      </div>
    </div>
  </div>

  <!-- PAGE BREAK -->
  <div class="page-break"></div>

  <!-- SLIDE 6 -->
  <div class="slide-card">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num">Slide 6</span>
        <span class="slide-title">The Problem — Lack of Interactive Educational Tools</span>
      </div>
      <span class="slide-speaker badge badge-amber">Speaker: Azatuhi 🇦🇲 (~25s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">What to say (Spoken Script):</div>
      <div class="script-text">
        "Traditional fact-checking websites are passive, text-heavy, and operate post-mortem — long after the damage is done. There is a critical lack of modern, interactive educational tools that train users in real time. We don't just need more fact sheets; we need a daily coach. Here to present our solution is Fotini."
      </div>
      <div class="transition-cue">
        🎤 <strong>Handoff:</strong> Azatuhi passes the microphone to <strong>Fotini</strong>.
      </div>
    </div>
  </div>

  <!-- SLIDE 7 -->
  <div class="slide-card">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num">Slide 7</span>
        <span class="slide-title">The Solution: Baseera</span>
      </div>
      <span class="slide-speaker badge badge-emerald">Speaker: Fotini 🇬🇷 (~30s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">What to say (Spoken Script):</div>
      <div class="script-text">
        "Thank you, Azatuhi. Meet <strong>Baseera</strong>. Baseera comes from the Arabic word for 'insight' or 'vision'. Our core philosophy is radically different: <em>Baseera does not judge content or tell you what to believe</em>. It works as an AI coach that turns whatever you want to share into a question, not a verdict — helping you build the lifelong habit of verifying before you trust. Now, Abdelkader will walk us through exactly how it works in practice."
      </div>
      <div class="transition-cue">
        🎤 <strong>Handoff:</strong> Fotini passes back to <strong>Abdelkader</strong>.
      </div>
    </div>
  </div>

  <div class="section-header">
    <div class="section-icon">2</div>
    <div class="section-title">Presentation Slide-by-Slide Script — Part 2 (Slides 8 to 14)</div>
  </div>

  <!-- SLIDE 8 -->
  <div class="slide-card">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num">Slide 8</span>
        <span class="slide-title">How It Works — Step 1: Share</span>
      </div>
      <span class="slide-speaker badge badge-blue">Speaker: Abdelkader 🇩🇿 (~20s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">What to say (Spoken Script):</div>
      <div class="script-text">
        "Thank you, Fotini. How does Baseera work in everyday life? It begins with <strong>Step 1: Share</strong>. Whenever you encounter a provocative news article, a WhatsApp message, or an image on social media, you simply share or paste the link or upload the photo directly into Baseera."
      </div>
      <div class="transition-cue">
        🔄 <strong>Next:</strong> "Once submitted, the AI engine takes over." <em>(Advance to Slide 9)</em>
      </div>
    </div>
  </div>

  <!-- SLIDE 9 -->
  <div class="slide-card">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num">Slide 9</span>
        <span class="slide-title">How It Works — Step 2: Analyze</span>
      </div>
      <span class="slide-speaker badge badge-blue">Speaker: Abdelkader 🇩🇿 (~20s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">What to say (Spoken Script):</div>
      <div class="script-text">
        "<strong>Step 2 is Analyze</strong>. Our AI engine instantly evaluates the content across three vectors: linguistic emotional bias, sensational triggers, and source credibility — cross-referencing over 280 peer-reviewed archives and trusted verification networks."
      </div>
      <div class="transition-cue">
        🔄 <strong>Next:</strong> "Then comes our secret sauce: Reflection." <em>(Advance to Slide 10)</em>
      </div>
    </div>
  </div>

  <!-- SLIDE 10 -->
  <div class="slide-card">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num">Slide 10</span>
        <span class="slide-title">How It Works — Step 3: Reflect</span>
      </div>
      <span class="slide-speaker badge badge-blue">Speaker: Abdelkader 🇩🇿 (~25s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">What to say (Spoken Script):</div>
      <div class="script-text">
        "<strong>Step 3 is Reflect</strong>. Instead of labeling the post 'False', Baseera poses a tailored Socratic question, such as: <em>'Did this article cite a primary scientific source before making this urgent claim?'</em> Combined with a 20-second cognitive pause timer, it breaks the impulsive cycle and gives your brain time to reason."
      </div>
      <div class="transition-cue">
        🔄 <strong>Next:</strong> "And the outcome is long-term growth." <em>(Advance to Slide 11)</em>
      </div>
    </div>
  </div>

  <!-- SLIDE 11 -->
  <div class="slide-card">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num">Slide 11</span>
        <span class="slide-title">How It Works — Step 4: Grow</span>
      </div>
      <span class="slide-speaker badge badge-blue">Speaker: Abdelkader 🇩🇿 (~20s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">What to say (Spoken Script):</div>
      <div class="script-text">
        "<strong>Step 4 is Grow</strong>. Baseera tracks your weekly progress with a Digital Resilience Index. Each time you question a trigger, your critical habits strengthen. Now, Anastasia will guide you through the real live screens of our application."
      </div>
      <div class="transition-cue">
        🎤 <strong>Handoff:</strong> Abdelkader passes the microphone to <strong>Anastasia</strong>.
      </div>
    </div>
  </div>

  <!-- PAGE BREAK -->
  <div class="page-break"></div>

  <!-- SLIDE 12 -->
  <div class="slide-card">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num">Slide 12</span>
        <span class="slide-title">Screens Demo — Part 1 (Onboarding & Dashboard)</span>
      </div>
      <span class="slide-speaker badge badge-purple">Speaker: Anastasia 🇺🇦 (~30s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">What to say (Spoken Script):</div>
      <div class="script-text">
        "Thank you, Abdelkader. Let's experience Baseera firsthand. As users open the app, they are welcomed by our brand Splash and an interactive 3-step Onboarding that establishes conscious sharing habits. On the Home Dashboard, users immediately see their Weekly Habit Score — currently at 88% — and one-tap access to 'Analyze Content' or perform a 'Privacy Scan'."
      </div>
      <div class="transition-cue">
        🔄 <strong>Next:</strong> "Let's see what happens when we submit a post." <em>(Advance to Slide 13)</em>
      </div>
    </div>
  </div>

  <!-- SLIDE 13 -->
  <div class="slide-card">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num">Slide 13</span>
        <span class="slide-title">Screens Demo — Part 2 (Result & Privacy Shield)</span>
      </div>
      <span class="slide-speaker badge badge-purple">Speaker: Anastasia 🇺🇦 (~35s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">What to say (Spoken Script):</div>
      <div class="script-text">
        "When content is submitted, our Processing screen displays real-time critical thinking tips. The Result screen highlights an Emotional Bias Gauge at 78% with the Socratic question and links to Reuters and AP. Furthermore, our Privacy Shield inspects photos, automatically strips hidden GPS metadata, and allows users to blur bystander faces and street signs with a single tap before sharing."
      </div>
      <div class="transition-cue">
        🎤 <strong>Handoff:</strong> Anastasia passes to <strong>Fotini</strong> for Key Features.
      </div>
    </div>
  </div>

  <!-- SLIDE 14 -->
  <div class="slide-card">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num">Slide 14</span>
        <span class="slide-title">Key Features</span>
      </div>
      <span class="slide-speaker badge badge-emerald">Speaker: Fotini 🇬🇷 (~30s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">What to say (Spoken Script):</div>
      <div class="script-text">
        "Thank you, Anastasia. To recap our competitive edge, Baseera provides five essential pillars: <strong>1) Multi-modal AI Content Analysis</strong> for text and imagery. <strong>2) On-Device Privacy Scanning</strong> with face blurring. <strong>3) The Socratic Inquiry Engine</strong>. <strong>4) Fact-Audit cross-referencing</strong>. And <strong>5) Cognitive Pause habit building</strong>. Now, Milena will present why Baseera matters and our roadmap."
      </div>
      <div class="transition-cue">
        🎤 <strong>Handoff:</strong> Fotini passes the microphone to <strong>Milena</strong>.
      </div>
    </div>
  </div>

  <div class="section-header">
    <div class="section-icon">3</div>
    <div class="section-title">Presentation Slide-by-Slide Script — Part 3 (Slides 15 to 19)</div>
  </div>

  <!-- SLIDE 15 -->
  <div class="slide-card">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num">Slide 15</span>
        <span class="slide-title">Why Baseera Matters</span>
      </div>
      <span class="slide-speaker badge badge-rose">Speaker: Milena 🇬🇪 (~25s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">What to say (Spoken Script):</div>
      <div class="script-text">
        "Thank you, Fotini. Why does Baseera matter right now? In our polarized digital climate, media literacy is no longer just a soft skill — it is civic defense. Generative AI makes synthetic media trivial to produce. By training youth and citizens to question emotional stimuli, Baseera protects democratic discourse, mental wellbeing, and personal privacy."
      </div>
      <div class="transition-cue">
        🔄 <strong>Next:</strong> "Let's examine how we sustain and scale this impact." <em>(Advance to Slide 16)</em>
      </div>
    </div>
  </div>

  <!-- SLIDE 16 -->
  <div class="slide-card">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num">Slide 16</span>
        <span class="slide-title">Pricing Plans & Sustainability</span>
      </div>
      <span class="slide-speaker badge badge-rose">Speaker: Milena 🇬🇪 (~25s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">What to say (Spoken Script):</div>
      <div class="script-text">
        "We designed a sustainable freemium model: <strong>Baseera Free</strong> gives individual users unlimited core checks. <strong>Baseera Edu</strong> offers schools and universities classroom analytics, lesson integration, and habit dashboards. And <strong>Baseera Pro / Enterprise</strong> provides journalists and NGOs with bulk verification tools and deep privacy protection."
      </div>
      <div class="transition-cue">
        🔄 <strong>Next:</strong> "Allow me to leave you with a timeless thought." <em>(Advance to Slide 17)</em>
      </div>
    </div>
  </div>

  <!-- SLIDE 17 -->
  <div class="slide-card">
    <div class="slide-card-header">
      <div class="slide-meta">
        <span class="slide-num">Slide 17</span>
        <span class="slide-title">Final Thought (Helen Keller Quote)</span>
      </div>
      <span class="slide-speaker badge badge-rose">Speaker: Milena 🇬🇪 (~25s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">What to say (Spoken Script):</div>
      <div class="script-text">
        "Helen Keller famously wrote: <em>'Life is either a daring adventure or nothing at all.'</em> In the vast digital frontier, building the courage to think for ourselves, to pause, and to seek the truth is our great adventure. Baseera is here to guide that journey."
      </div>
      <div class="transition-cue">
        🎤 <strong>Handoff:</strong> Milena passes to <strong>Anastasia / Abdelkader</strong> for the live trial.
      </div>
    </div>
  </div>

  <!-- PAGE BREAK -->
  <div class="page-break"></div>

  <!-- SLIDE 18 (TRY IT) -->
  <div class="slide-card" style="border: 2px solid #0284C7;">
    <div class="slide-card-header" style="background: #F0F9FF;">
      <div class="slide-meta">
        <span class="slide-num" style="background: #0284C7;">Slide 18</span>
        <span class="slide-title" style="color: #0369A1;">Try It — Live QR Code & APK</span>
      </div>
      <span class="slide-speaker badge badge-purple">Speaker: Anastasia 🇺🇦 (or Abdelkader 🇩🇿) (~25s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">What to say (Spoken Script):</div>
      <div class="script-text">
        "Now that you have seen what Baseera can do, we invite you to experience it right now on your own devices! Please scan the QR code displayed on your screen to download our Android APK or launch our responsive web application. Test any link or image you want — the AI coach is ready for you!"
      </div>
      <div class="transition-cue">
        🔄 <strong>Next:</strong> "And with that, we conclude our presentation." <em>(Advance to Slide 19)</em>
      </div>
    </div>
  </div>

  <!-- SLIDE 19 (THANK YOU) -->
  <div class="slide-card" style="border: 2px solid #0F172A;">
    <div class="slide-card-header" style="background: #0F172A; color: #FFFFFF;">
      <div class="slide-meta">
        <span class="slide-num" style="background: #0284C7;">Slide 19</span>
        <span class="slide-title" style="color: #FFFFFF;">Thank You & Hackathon Closing</span>
      </div>
      <span class="slide-speaker badge badge-dark" style="border: 1px solid #475569;">Speaker: Abdelkader 🇩🇿 (Closing & All Team Q&A) (~25s)</span>
    </div>
    <div class="slide-body">
      <div class="script-label">What to say (Spoken Script):</div>
      <div class="script-text">
        "Thank you so much to our mentors, the Erasmus+ Digital Hackathon jury, and the VirtuallyEdu organization. At Baseera, our motto will always be: <strong>'Teaching minds to doubt, not machines to decide.'</strong> Our entire international team is now here and eager to answer your questions!"
      </div>
      <div class="transition-cue">
        🙌 <strong>Closing Action:</strong> All team members smile, step forward, and open the floor for jury Q&A.
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
      <div style="font-size: 9.5px; color: #64748B; margin-top: 3px;">Local APK: C:\\Users\\CORTEC\\Downloads\\Erasmus\\baseera\\baseera.apk</div>
    </div>
  </div>

  <!-- PAGE BREAK FOR VISUAL SCREENS -->
  <div class="page-break"></div>

  <div class="section-header">
    <div class="section-icon">4</div>
    <div class="section-title">Visual Screen Reference (Screens 1 to 9)</div>
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

  <!-- PAGE BREAK FOR REMAINING SCREENS -->
  <div class="page-break"></div>

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

  <!-- Screen 9: Privacy Screen -->
  <div class="card avoid-break" style="margin-top: 10px; padding: 10px 12px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px;">
    <div style="display: flex; gap: 12px;">
      <div class="screen-img-wrap" style="flex: 0 0 85px; height: 160px;">
        <img src="{img_privacy}" class="screen-img" alt="Privacy Screen">
      </div>
      <div style="flex: 1;">
        <div class="screen-number">Screen 09</div>
        <div class="screen-heading">Privacy Inspection & Anonymizer</div>
        <div class="screen-desc" style="font-size: 10.5px; color: #475569; margin-bottom: 5px;">
          Empowers users to safeguard personal and bystanders' privacy before publishing photos. Inspects images for sensitive landmarks, unconsenting faces, and metadata leaks.
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-top: 4px;">
          <div style="background: #F1F5F9; padding: 5px 7px; border-radius: 5px; font-size: 9.5px;">
            <strong>📍 Street & Geo Signs:</strong> Storefronts & street names detected → One-click <em>Mask</em>.
          </div>
          <div style="background: #F1F5F9; padding: 5px 7px; border-radius: 5px; font-size: 9.5px;">
            <strong>👤 Bystander Faces:</strong> 2 faces identified in background → One-click <em>Blur All</em>.
          </div>
          <div style="background: #F1F5F9; padding: 5px 7px; border-radius: 5px; font-size: 9.5px;">
            <strong>🗺️ EXIF GPS Tags:</strong> Precise latitude/longitude coordinates → <em>Auto-Removed</em>.
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer-note avoid-break">
    <div>VirtuallyEdu • Erasmus+ Digital Hackathon — Project Baseera</div>
    <div>Complete Slide-by-Slide Script & Walkthrough • Ready for Presentation Delivery</div>
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

print("Generating updated PDF with complete slide script...")
res = subprocess.run(cmd, capture_output=True, text=True)
print("Return code:", res.returncode)

if os.path.exists(pdf_dest1):
    import shutil
    shutil.copy2(pdf_dest1, pdf_dest2)
    print(f"Success! Updated PDF generated at {pdf_dest1} (size: {os.path.getsize(pdf_dest1):,} bytes)")
    print(f"Also copied to {pdf_dest2}")
else:
    print("Error generating PDF:", res.stderr)
