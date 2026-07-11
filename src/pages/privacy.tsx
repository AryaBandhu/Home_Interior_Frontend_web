import { Link } from "react-router-dom"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"

const sections = [
  {
    title: "Introduction",
    content: `Welcome to Spacia. This Privacy Policy explains how Kalkinso Software (OPC) Private Limited, operating as Spacia ("Spacia," "we," "us," or "our"), collects, uses, stores, shares, and protects your information when you use our mobile application, website, and related services.\n\nSpacia is an AI-powered room image generation and interior design application. Users can upload raw room images and provide design preferences, prompts, or style instructions. Spacia uses artificial intelligence, including third-party AI models such as Google Gemini, to refine the uploaded room image and generate interior design concepts based on the user's selected style, theme, or requirements.\n\nBy using Spacia, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with this policy, please do not use Spacia.`,
  },
  {
    title: "Information We Collect",
    content: `We may collect the following information when you use Spacia:\n\nAccount Information: When you create an account or sign in using Google, Apple, email, or another login method, we may collect your name, email address, profile image, login identifier, and account-related details.\n\nUploaded Room Images: When you upload a raw room image, we collect and process that image to generate interior design outputs. Uploaded images may include details of your home, furniture, objects, room layout, walls, windows, doors, lighting, or other visible items.\n\nPrompts and Design Preferences: We collect the text prompts, style selections, room type, color preferences, design theme, and other instructions you provide to generate your desired room design.\n\nGenerated Images and Outputs: We may collect and store the AI-generated room designs, previews, variations, and related output created through Spacia.\n\nPayment and Subscription Information: If you purchase a subscription, credits, or paid features, payment may be processed by third-party payment providers, Apple App Store, Google Play Store, or other payment gateways. We may receive limited transaction details such as order ID, purchase status, plan type, subscription status, and payment confirmation. We do not store full card details.\n\nSupport Communications: If you contact us for help, feedback, complaints, refunds, or technical support, we may collect your name, email address, message content, screenshots, device details, and other information you choose to provide.`,
  },
  {
    title: "Information We Collect Automatically",
    content: `When you use Spacia, we may automatically collect:\n\nUsage Data: Information about how you interact with the app, including features used, designs generated, buttons clicked, session duration, credits used, subscription status, and app activity.\n\nDevice Information: Device type, operating system, app version, browser type, device identifiers, language settings, crash logs, and diagnostic information.\n\nLog Data: IP address, access time, server logs, error reports, request timestamps, and security-related logs.\n\nAnalytics Data: We may use analytics tools to understand app performance, user behavior, feature usage, and technical issues.\n\nCookies and Similar Technologies: If you use our website, we may use cookies, pixels, SDKs, local storage, and similar technologies to maintain sessions, improve security, analyze traffic, and improve user experience.`,
  },
  {
    title: "Camera, Gallery, and Storage Permissions",
    content: `Spacia may request access to your camera, photo gallery, or device storage so that you can upload room images for design generation. We only access images you select or upload. We do not access your entire photo gallery without your permission. You can manage these permissions through your device settings.`,
  },
  {
    title: "How We Use Your Information",
    content: `We use your information to:\n\n1. Provide, operate, and improve Spacia.\n2. Process uploaded room images and generate AI-based interior design outputs.\n3. Send your uploaded images, prompts, and design preferences to AI service providers, including Google Gemini, where required to generate results.\n4. Create, store, and display generated room designs in your account.\n5. Manage accounts, subscriptions, credits, payments, and purchase history.\n6. Provide customer support and respond to queries.\n7. Fix bugs, improve app performance, and develop new features.\n8. Detect, prevent, and investigate fraud, abuse, unauthorized access, and security incidents.\n9. Send service-related notifications, updates, security alerts, and support messages.\n10. Send promotional or marketing communications, where permitted by law. You may opt out of marketing emails at any time.\n11. Comply with legal obligations, enforce our terms, and protect our rights.`,
  },
  {
    title: "Use of AI and Third-Party Model Providers",
    content: `Spacia uses third-party artificial intelligence models and cloud services, including Google Gemini, to generate or refine room images.\n\nWhen you upload a room image or submit a prompt, that content may be transmitted to third-party AI providers for processing. These providers may process your uploaded image, prompt, and generated output according to their own applicable terms, privacy policies, and data-processing practices.\n\nYou should avoid uploading images that contain sensitive personal information, private documents, identification cards, faces of children, financial information, medical information, passwords, private addresses, or anything you do not want processed by an AI system.\n\nUnless clearly stated otherwise, Spacia-generated outputs are for visual inspiration and interior design concept purposes only. They should not be treated as professional architectural, structural, electrical, civil engineering, safety, or legal advice.`,
  },
  {
    title: "How We Share Your Information",
    content: `We may share your information in the following situations:\n\nWith AI Service Providers: We may share uploaded images, prompts, and related data with AI model providers such as Google Gemini to generate the requested room design outputs.\n\nWith Cloud and Infrastructure Providers: We may use third-party hosting, database, storage, security, and computing providers to operate Spacia.\n\nWith Payment Providers: If you make purchases, payment-related information may be shared with payment processors, Apple App Store, Google Play Store, or other billing providers.\n\nWith Analytics and Crash Reporting Providers: We may use third-party tools to understand usage, monitor performance, detect crashes, and improve the app.\n\nFor Legal Reasons: We may disclose information if required by law, regulation, court order, legal process, government request, or to protect our rights, users, property, and safety.\n\nBusiness Transfers: If Spacia is involved in a merger, acquisition, financing, restructuring, sale of assets, or similar transaction, user information may be transferred as part of that transaction.\n\nWith Your Consent: We may share information for any other purpose with your consent or at your direction.`,
  },
  {
    title: "User Content and Privacy",
    content: `You retain your rights in the images and prompts you upload to Spacia. By uploading content, you grant Spacia a limited, non-exclusive, worldwide license to host, store, process, modify, reproduce, display, and transmit your content only as needed to provide, improve, secure, and support the Service.\n\nWe do not sell your uploaded room images to advertisers. We do not use your private uploaded room images for public marketing, social media, or promotional purposes without your permission.\n\nIf we want to showcase your generated design publicly, we will ask for your consent first.`,
  },
  {
    title: "Data Retention",
    content: `We retain your information only for as long as necessary to provide Spacia, comply with legal obligations, resolve disputes, enforce agreements, prevent fraud, and maintain security.\n\nUploaded images and generated outputs may be stored in your account until you delete them or request deletion, unless retention is required for legal, security, billing, backup, or dispute-resolution purposes.\n\nYou may request deletion of your account and associated personal data by contacting us at support@kalkinso.in.`,
  },
  {
    title: "Data Security",
    content: `We use reasonable technical, administrative, and organizational measures to protect your information from unauthorized access, loss, misuse, alteration, or disclosure.\n\nHowever, no internet-based service, cloud platform, or AI processing system is completely secure. You use Spacia at your own risk and should avoid uploading highly sensitive or confidential images.`,
  },
  {
    title: "Your Rights and Choices",
    content: `Depending on your location and applicable law, you may have rights to:\n\n1. Access the personal information we hold about you.\n2. Correct inaccurate or incomplete information.\n3. Delete your account or personal data.\n4. Withdraw consent where processing is based on consent.\n5. Object to or restrict certain processing.\n6. Request a copy of your data.\n7. Opt out of marketing communications.\n8. Raise a privacy-related grievance.\n\nTo exercise these rights, contact us at support@kalkinso.in.`,
  },
  {
    title: "Children's Privacy",
    content: `Spacia is not intended for users under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided personal information without appropriate consent, we will take steps to delete such information.`,
  },
  {
    title: "International Data Transfers",
    content: `Your information may be processed and stored in countries other than your country of residence. These countries may have different data protection laws. Where required, we take appropriate measures to protect your information in accordance with this Privacy Policy and applicable laws.`,
  },
  {
    title: "Third-Party Links and Services",
    content: `Spacia may contain links to third-party websites, services, payment providers, or login providers. We are not responsible for the privacy practices, policies, or content of third-party services. You should review their privacy policies before using them.`,
  },
  {
    title: "Changes to This Privacy Policy",
    content: `We may update this Privacy Policy from time to time. If we make material changes, we may notify you through the app, email, or website notice. The updated policy will be effective when posted with the revised "Last Updated" date.`,
  },
  {
    title: "Contact Us",
    content: `If you have any questions, concerns, requests, or complaints about this Privacy Policy or our data practices, please contact us at:\n\nSpacia Support\nEmail: support@kalkinso.in\nCompany: Kalkinso Software (OPC) Private Limited\nAddress: 506 SHUKL PURE NANHA, SHUKL AINDHA, Aindha, Pratapgarh, Kunda, Uttar Pradesh, India, 230204`,
  },
]

export function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Badge className="mb-4 bg-gradient-to-r from-orange-500/20 to-fuchsia-500/20 border-orange-500/30 text-orange-600 dark:text-orange-400">
          Legal
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
        <p className="mt-3 text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="mt-12 space-y-10">
          {sections.map((s, i) => (
            <div key={s.title}>
              <h2 className="text-xl font-bold flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-fuchsia-600 text-white text-xs font-bold">{i + 1}</span>
                {s.title}
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed whitespace-pre-line">{s.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-fuchsia-500/5 p-6">
          <p className="text-sm text-muted-foreground">
            Questions about this policy? Contact us at{" "}
            <a href="mailto:support@kalkinso.in" className="text-orange-500 hover:underline">support@kalkinso.in</a>
          </p>
        </div>
      </main>

      <footer className="border-t border-border mt-auto">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6">
          <Logo />
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/about" className="hover:text-foreground">About</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
