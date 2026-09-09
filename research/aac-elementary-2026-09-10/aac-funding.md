# AAC devices and apps for elementary students: the pipeline and the money

Prepared for Frank Schaeffer, EZ Voice LLC (EZvoxa). Slice: who evaluates, who pays, how much, under what rules.

Date read: the brief says to record 10 September 2026. The session clock read 9 September 2026 UTC while the pages were fetched. Every URL below was opened on that day unless marked blocked.

Sourcing: only the entity's own pages. Where a page could not be opened, or its content could not be read (JavaScript-rendered shells), that is recorded in the "Blocked or not checked" section rather than filled in from memory. Rule text is quoted in the source's own words. Nothing below is a dollar figure, code, or rule I did not read on the page cited.

---

## 1. Medicare and Medicaid coverage of speech-generating devices (SGDs)

### 1a. The HCPCS codes E2500 through E2512

Source: CMS July 2026 Alpha-Numeric HCPCS file (record file HCPC2026_JUL_ANWEB_06172026.txt), downloaded from https://www.cms.gov/files/zip/july-2026-alpha-numeric-hcpcs-file.zip, linked from https://www.cms.gov/medicare/coding-billing/healthcare-common-procedure-system/quarterly-update. Long descriptions quoted verbatim.

| Code | CMS long description (verbatim) |
|---|---|
| E2500 | "Speech generating device, digitized speech, using pre-recorded messages, less than or equal to 8 minutes recording time" |
| E2502 | "Speech generating device, digitized speech, using pre-recorded messages, greater than 8 minutes but less than or equal to 20 minutes recording time" |
| E2504 | "Speech generating device, digitized speech, using pre-recorded messages, greater than 20 minutes but less than or equal to 40 minutes recording time" |
| E2506 | "Speech generating device, digitized speech, using pre-recorded messages, greater than 40 minutes recording time" |
| E2508 | "Speech generating device, synthesized speech, requiring message formulation by spelling and access by physical contact with the device" |
| E2510 | "Speech generating device, synthesized speech, permitting multiple methods of message formulation and multiple methods of device access" |
| E2511 | "Speech generating software program, for personal computer or personal digital assistant" |
| E2512 | "Accessory for speech generating device, mounting system" |
| E2599 (for reference; Tobii Dynavox cites it) | "Accessory for speech generating device, not otherwise classified" |

Note: E2511 is the only code that describes software rather than a device.

### 1b. Medicare National Coverage Determination 50.1, Speech Generating Devices

Page: https://www.cms.gov/medicare-coverage-database/view/ncd.aspx?ncdid=274 (the page renders its body in the browser; the text was read from CMS's own Medicare Coverage Database API at https://api.coverage.cms.gov/v1/data/ncd/?ncdid=274&ncdver=2, which returned the same document).

Current version: version 2, effective 07/29/2015, implementation 09/21/2015, benefit category "Durable Medical Equipment", transmittal 184. Version 1 (effective 01/01/2001) ended 07/29/2015.

Section A, General, in the NCD's own words:

> "Speech generating devices are considered to fall within the durable medical equipment (DME) benefit category established by §1861(n) of the Social Security Act. They are covered for patients who suffer from a severe speech impairment and have a medical condition that warrants the use of a device based on the following definitions."

> "Speech generating devices are defined as durable medical equipment that provides an individual who has a severe speech impairment with the ability to meet his or her functional, speaking needs. Speech generating devices are speech aids consisting of devices or software that generate speech and are used solely by the individual who has a severe speech impairment. The speech is generated using one of the following methods:
> - digitized audible/verbal speech output, using prerecorded messages;
> - synthesized audible/verbal speech output which requires message formulation by spelling and device access by physical contact with the device-direct selection techniques;
> - synthesized audible/verbal speech output which permits multiple methods of message formulation and multiple methods of device access; or
> - software that allows a computer or other electronic device to generate audible/verbal speech."

> "Other covered features of the device include the capability to generate email, text, or phone messages to allow the patient to 'speak' or communicate remotely, as well as the capability to download updates to the covered features of the device from the manufacturer or supplier of the device."

> "If a speech generating device is limited to use by a patient with a severe speech impairment and is primarily used for the purpose of generating speech, it is not necessary for the device to be dedicated only to audible/verbal speech output to be considered DME. Computers and tablets are generally not considered DME because they are useful in the absence of an illness or injury."

Section B, Nationally Covered Indications: "N/A".

Section C, Nationally Non-Covered Indications, in the NCD's words:

> "Internet or phone services or any modification to a patient's home to allow use of the speech generating device are not covered by Medicare because such services or modifications could be used for non-medical equipment such as standard phones or personal computers. In addition, specific features of a speech generating device that are not used by the individual who has a severe speech impairment to meet his or her functional speaking needs are not covered. This would include any computing hardware or software not necessary to allow for generation of audible/verbal speech, email, text or phone messages, such as hardware or software used to create documents and spreadsheets or play games or music, and any other function a computer can perform that is not directly related to meeting the functional speaking communication needs of the patient, including video communications or conferencing. These features of a speech generating device do not fall within the scope of § 1861(n) of the Social Security Act and the cost of these features are the responsibility of the beneficiary."

Section D, Other: "A/B MACs acting within their respective jurisdictions have discretion to cover or not cover speech generating devices based on their individual reasonable and necessary determinations."

The pre-2015 version 1 (https://api.coverage.cms.gov/v1/data/ncd/?ncdid=274&ncdver=1) listed as characteristics of an SGD "Being a dedicated speech device, used solely by the individual who has a severe speech impairment" and excluded "Laptop computers, desktop computers, or PDA's which may be programmed to perform the same function as a speech generating device". The 2015 revision replaced that with the "not necessary for the device to be dedicated only to audible/verbal speech output" language above.

### 1c. Medicare Local Coverage Determination L33739, Speech Generating Devices (SGD)

Page: https://www.cms.gov/medicare-coverage-database/view/lcd.aspx?lcdid=33739 (text was present in the page HTML). This LCD is issued by the four DME MACs; CGS Administrators, LLC, contract 18003, Jurisdiction J-C, lists Florida among its states. Original effective date "For services performed on or after 10/01/2015"; revision effective date "For services performed on or after 10/01/2024".

Coverage criteria in the LCD's words:

> "A speech generating device (SGD) (E2500, E2502, E2504, E2506, E2508, E2510, E2511) is covered when all of the following criteria (1-7) are met:
> 1. Prior to the delivery of the SGD, the beneficiary has had a formal evaluation of their cognitive and communication abilities by a speech-language pathologist (SLP). The formal, written evaluation must include, at a minimum, the following elements:
>    - Current communication impairment, including the type, severity, language skills, cognitive ability, and anticipated course of the impairment;
>    - An assessment of whether the individual's daily communication needs could be met using other natural modes of communication;
>    - A description of the functional communication goals expected to be achieved and treatment options;
>    - Rationale for selection of a specific device and any accessories;
>    - Demonstration that the beneficiary possesses a treatment plan that includes a training schedule for the selected device;
>    - The cognitive and physical abilities to effectively use the selected device and any accessories to communicate;
>    - For a subsequent upgrade to a previously issued SGD, information regarding the functional benefit to the beneficiary of the upgrade compared to the initially provided SGD; and
> 2. The beneficiary's medical condition is one resulting in a severe expressive speech impairment; and
> 3. The beneficiary's speaking needs cannot be met using natural communication methods; and
> 4. Other forms of treatment have been considered and ruled out; and
> 5. The beneficiary's speech impairment will benefit from the device ordered; and
> 6. A copy of the SLP's written evaluation and recommendation have been forwarded to the beneficiary's treating practitioner prior to ordering the device; and
> 7. The SLP performing the beneficiary evaluation may not be an employee of or have a financial relationship with the supplier of the SGD."

> "Codes E2500, E2502, E2504, E2506, E2508, E2510, E2511 perform the same essential function - speech generation. Therefore, claims for more than one SGD will be denied as not reasonable and necessary."

> "A Standard Written Order (SWO) must be communicated to the supplier before a claim is submitted."

(The numbering 1 to 7 is the LCD's; the page renders the items as a list.)

### 1d. Medicare DMEPOS fee schedule amounts, July 2026 (DME26-C), Florida

Source: CMS DMEPOS Fee Schedule release DME26-C, described on https://www.cms.gov/medicare/payment/fee-schedules/dmepos/dmepos-fee-schedule/dme26-c as "July 2026 DMEPOS Fee Schedule", ZIP at https://www.cms.gov/files/zip/dme26-c.zip, file DMEPOS_JUL.csv inside. Linked from the DMEPOS Fee Schedule page https://www.cms.gov/medicare/payment/fee-schedules/dmepos/dmepos-fee-schedule. The CSV has a "FL (NR)" (non-rural) and "FL (R)" (rural) column per code and modifier. The CMS DMEREAD 2026.pdf in the same ZIP says codes without rural adjustment "will only have fee schedule amounts in the non-rural (NR) columns"; for every SGD code the FL (R) column is 0.00.

All SGD rows in the file carry jurisdiction "D" and category "IN". The modifier column shows NU, RR, and UE for each code; I did not confirm the modifier descriptions from the file, so their meanings are not stated here.

| Code | Modifier | Florida (NR) amount | National ceiling | National floor |
|---|---|---|---|---|
| E2500 | NU | $557.30 | $557.30 | $473.71 |
| E2500 | RR | $55.73 | $55.73 | $47.37 |
| E2500 | UE | $417.97 | $417.97 | $355.27 |
| E2502 | NU | $1,704.17 | $1,704.17 | $1,448.54 |
| E2504 | NU | $2,248.05 | $2,248.05 | $1,910.84 |
| E2506 | NU | $3,296.27 | $3,296.27 | $2,801.83 |
| E2508 | NU | $5,097.15 | $5,097.15 | $4,332.58 |
| E2508 | RR | $509.71 | $509.71 | $433.25 |
| E2508 | UE | $3,822.88 | $3,822.88 | $3,249.45 |
| E2510 | NU | $9,645.69 | $9,645.69 | $8,198.84 |
| E2510 | RR | $964.56 | $964.56 | $819.88 |
| E2510 | UE | $7,234.25 | $7,234.25 | $6,149.11 |
| E2511 | NU, RR, UE | 0.00 | 0.00 | 0.00 |
| E2512 | NU, RR, UE | 0.00 | 0.00 | 0.00 |

The file shows 0.00 in every column for E2511 (software) and E2512 (mounting). The DMEREAD notes I read explain zeros for other specific codes; they do not say why E2511 and E2512 are zero. Not checked further. The DMEREAD disclaimer: "Inclusion or exclusion of a fee schedule for an item or service does not imply any health insurance coverage."

---

## 2. Florida Medicaid

### 2a. Florida Medicaid DME fee schedule, July 1, 2026

Source: "Durable Medical Equipment (DME) and Medical Supply Services Provider Fee Schedule for All Medicaid Recipients, July 1, 2026", Excel file at https://ahca.myflorida.com/file/medicaid/July%201%202026%20DME%20Fee%20Schedule%20Finalized.xlsx, linked from AHCA's Rule 59G-4.002 page https://ahca.myflorida.com/medicaid/rules/rule-59g-4.002-provider-reimbursement-schedules-and-billing-codes.html as "Updated Fee Schedule" (the "Promulgated" version linked there is dated 2025). SGD codes appear on the "Specialized" tab.

| Code | Age | Maximum Fee | Prior Authorization | Limit |
|---|---|---|---|---|
| E2500 | 0 - 999 | $360.56 | PA | 1 PER 5 YEARS |
| E2502 | 0 - 999 | $1,102.55 | PA | 1 PER 5 YEARS |
| E2504 | 0 - 999 | $1,454.42 | PA | 1 PER 5 YEARS |
| E2506 | 0 - 999 | $2,132.62 | PA | 1 PER 5 YEARS |
| E2508 | 0 - 999 | $3,297.74 | PA | 1 PER 5 YEARS |
| E2510 | 0 - 999 | $6,240.51 | PA | 1 PER 5 YEARS |
| E2511 | 0 - 999 | MP (manually priced) | PA | 1 PER 5 YEARS |
| E2512 | 0 - 999 | MP (manually priced) | PA | 1 PER 5 YEARS |
| E1399 (misc. DME) | 0 - 999 | MP | PA | MEDICAL NECESSITY |

The fee schedule's own legend (tab "Fee Schedule Information"):

- Maximum Fee: "This column is the maximum amount that Medicaid will pay for the DME, medical supply, or orthotic or prosthetic device."
- Manually Priced (MP): "This column indicates that the reimbursement rate must be negotiated between the provider and the Agency's contracted quality improvement organization."
- Prior Authorization (PA): "This column identifies the procedure codes that require prior authorization by the Agency's fee-for-service delivery system Quality Improvement Organization (QIO) vendor before the service is performed, including any requests to exceed limits or request services not listed on the fee schedule (E1399)."

So in Florida Medicaid the software code E2511 has no listed fee; it is negotiated case by case with the QIO, and every SGD code needs prior authorization and is limited to one per five years.

Comparison: Florida Medicaid's maximum for E2510 ($6,240.51) is about 65 percent of the Medicare Florida amount ($9,645.69); for E2508, $3,297.74 against $5,097.15. (Arithmetic on the two cited figures; not a published ratio.)

### 2b. Florida Medicaid coverage policy for AAC: Rule 59G-4.072, "Durable Medical Equipment and Medical Supply Services Coverage Policy: Specialized" (December 2023)

Source PDF: https://ahca.myflorida.com/content/download/23763/file/59G-4.072%20Durable%20Medical%20%20Equipment%20and%20Medical%20Supply%20Services%20Specialized.pdf, linked from https://ahca.myflorida.com/medicaid/rules/adopted-rules-service-specific-policies.html. AAC is covered in this "Specialized" policy, not in a general DME rule.

Section 4.2.1, Augmentative and Alternative Communication Systems, in the policy's words:

> "Medicaid covers speech-generating devices and software that allow recipients with severe expressive communication disorders to communicate. The recipient must have the physical, cognitive, and language abilities necessary to operate the AAC device, as documented in an evaluative report and individualized action plan developed by a speech-language pathologist who is licensed in accordance with Chapter 468, Part I, F.S. and meets the requirements of 42 CFR 440.110."

> "Florida Medicaid coverage of an AAC device includes the following service components:
> - The AAC device or software
> - Modifications to adapt the AAC device to the physical characteristics of the recipient
> - The programming necessary to meet the recipient's functional communication needs"

> "Prior to filing a claim for an AAC device, the DME provider must ensure the selected device and all components/accessories have been delivered to the recipient and are operational. Prior to the delivery of the AAC device, the provider must notify the recipient's speech-language pathologist of the delivery date."

Section 5.2, Specific Non-Covered Criteria (the iPad question), in the policy's words:

> "Florida Medicaid does not cover the following as part of this service benefit:
> - AAC systems or devices that do not meet the definition of DME (e.g., no-tech or low-tech AAC, computers, tablets, smartphones, or other general computing devices)"

Section 6.2.1, documentation the DME provider must hold for an AAC system (in addition to the general DME documentation in 6.2):

> "Speech-language pathologist's evaluation that reports the following:
> - Significant medical diagnosis(es), medical history, and prognosis (i.e., anticipated course of impairment)
> - Motor skills (e.g., accuracy of movement, writing impairments, etc.), including posture/position and mobility
> - Cognitive abilities
> - Sensory and perceptual processing (e.g., hearing, vision)
> - Oral motor speech status
> - Language comprehension and expression
> - Daily communication needs, based on environment and primary communication partners
> - AAC device recommendation, including a description of features and any necessary adaptive accessories (e.g., mounting system for wheelchair)
> - The printed name, signature, title, and date of the evaluating speech-language pathologist"

> "Individualized action plan or plan of care that includes the following:
> - Description of the AAC device
> - Specific benefits of the selected AAC device over other options, including trial data
> - Explanation of any AAC systems or devices previously used, including limitations/barriers
> - Long and short-term functional communication goals
> - Established plan for fitting, adjustments, and training
> - The lead SLP's printed name, signature, title, and date
> - Signatures, titles, and dates by all other contributing interdisciplinary team members (as applicable for children enrolled in school)"

Section 6.2 (general DME) requires the provider to hold one of: "Certificate of Medical Necessity, prepared and signed by the authorizing practitioner" that "Is dated within 21 days after the initiation of service", "Is less than 12 months old", "Specifies a diagnosis as the basis for the services prescribed"; or a "Current hospital discharge plan"; or a "Written prescription" that "Is less than 12 months old" and "Is dated within 21 days after the initiation of services".

Section 7.2, Authorization: "Providers must obtain authorization from the quality improvement organization (QIO) as follows: For miscellaneous procedure codes; When indicated on the applicable Florida Medicaid fee schedule(s)." (Every SGD code is so indicated; see 2a.)

Section 1.2, managed care: "Florida Medicaid managed care plans must comply with the service coverage requirements outlined in this policy, unless otherwise specified in the AHCA contract with the Florida Medicaid managed care plan. The provision of services to recipients enrolled in a Florida Medicaid managed care plan must not be subject to more stringent service coverage limits than specified in Florida Medicaid policies."

Section 8.2, claim type: "Professional (837P/CMS-1500)".

### 2c. Florida Medicaid Speech-Language Pathology policy, Rule 59G-4.324 (the evaluation side)

Source PDF: https://ahca.myflorida.com/content/download/7044/file/59G_4-324_Speech_Language_Therapy_Services.pdf (linked from the same adopted-rules page). Definition 1.3.1: "Augmentative and Alternative Communication: A device designed to allow individuals with severe, expressive communication disorders the capability to communicate (also referred to as an AAC)." Covered, "in accordance with the applicable fee schedule(s)": "One initial AAC evaluation every five years, per recipient"; "One follow-up AAC evaluation upon delivery of the device, per recipient"; "Up to eight 30-minute AAC fitting, adjustment, and training sessions per year, per recipient"; "Up to two AAC reevaluations per year, per recipient with an AAC device".

### 2d. Florida Medicaid Certified School Match program (how a school district bills Medicaid for the AAC evaluation, and who bills for the device)

Handbook: "Medicaid Certified School Match Coverage and Limitations Handbook", dated January 2005 on its pages, PDF at https://ahca.myflorida.com/content/download/7047/file/Certified_School_MatchHB.pdf, linked from the AHCA adopted-rules page. Chapter 7 is "Augmentative and Alternative Communication Services". In its words:

- "An interdisciplinary team (ID team) must be formed to evaluate the student, recommend an AAC and write an individualized action plan. The ID team must consist of at least two members and must include a speech-language pathologist who will lead the team."
- "The DME provider must submit a prior authorization package to the Medicaid fiscal agent for Medicaid review and approval. ... (the DME provider may obtain items 1 through 4 from the school district): 1. The AAC evaluation signed by the ID team members; 2. The individualized action plan; 3. A prescription for the AAC signed and dated by the recipient's physician, advanced registered nurse practitioner, or physician's assistant ...; 4. The MediPass authorization number if the student is a MediPass participant; 5. A completed Florida Medicaid Prior Authorization form; 6. An itemized invoice listing retail costs for the equipment; and 7. Manufacturer's catalogue information regarding cost and warranty information. The DME provider is responsible for completing items 5, 6 and 7."
- "Prior to billing for an AAC system, the DME provider is responsible to ensure the properly selected system and all components have been delivered to the student and are operational in the student's home."
- "The ID team must select an AAC that is based on the recipient's current medical needs and projected changes in the recipient's communication development over at least a 5-year period."
- "The ID team may recommend that the student have a trial period with the AAC system. The trial period must be prior authorized by the Medicaid consultant." "Medicaid reimburses DME providers for rental-only AAC systems for trial periods."
- "The school district must send the evaluation, which includes the recommended AAC and the individualized action plan to a physician, ARNP or PA or designated physician specialist. The physician, ARNP or PA or designated physician specialist must review the evaluation and individualized action plan and if he or she concurs, prescribe the AAC."
- "The medical professionals who evaluate the student, serve on the ID team, or prescribe the AAC must not have a financial relationship with or receive any gain from the AAC manufacturer."
- Appendix B: "actual reimbursement that a billing school district receives is only for the federal share of that fee for each allowable unit of service."

So under this program the district is paid (federal share only) for the evaluation, re-evaluation and fitting/training visits; the DME provider, not the district, obtains the prior authorization and bills Medicaid for the device, and the device is delivered to the student's home.

2026 Medicaid Certified School Match Fee Schedule (https://ahca.myflorida.com/content/download/28125/file/2026%20Medicaid%20Certified%20School%20Match%20Fee%20Schedule.pdf):

| Code | Description (as listed) | Maximum Fee | Limit |
|---|---|---|---|
| 92597 | AAC Initial Evaluation Provided by a Speech-Language Pathologist | $102.63 | 1 per 5 years |
| 92597 GO | AAC Initial Evaluation Provided by an Occupational Therapist | $102.63 | 1 per 5 years |
| 92597 GP | AAC Initial Evaluation Provided by a Physical Therapist | $102.63 | 1 per 5 years |
| 92597 GN | AAC Re-Evaluation Provided by a Speech-Language Pathologist | $52.63 | 1 per 6 months |
| 92609 | AAC Fitting, Adjustment, and Training Visit | $42.11 | 8 per year |

### 2e. Rule 59G-4.070

AHCA's adopted-rules pages (service-specific, general, main, and "rules in process") list DME policies 59G-4.072 through 59G-4.077 and link their flrules.org entries. I found no link or PDF titled 59G-4.070 on any AHCA page I read. flrules.org is blocked at the proxy (see below), so I could not confirm whether 59G-4.070 exists or what it says. The AAC language for Florida Medicaid is in 59G-4.072 as quoted above.

---

## 3. Schools: IDEA and assistive technology

All from the eCFR, Title 34, Part 300, as of 1 September 2026 (https://www.ecfr.gov, API endpoint https://www.ecfr.gov/api/versioner/v1/full/2026-09-01/title-34.xml?part=300&section=...). Quotes are the regulation text.

34 CFR 300.5, Assistive technology device:

> "Assistive technology device means any item, piece of equipment, or product system, whether acquired commercially off the shelf, modified, or customized, that is used to increase, maintain, or improve the functional capabilities of a child with a disability. The term does not include a medical device that is surgically implanted, or the replacement of such device."

34 CFR 300.6, Assistive technology service:

> "Assistive technology service means any service that directly assists a child with a disability in the selection, acquisition, or use of an assistive technology device. The term includes— (a) The evaluation of the needs of a child with a disability, including a functional evaluation of the child in the child's customary environment; (b) Purchasing, leasing, or otherwise providing for the acquisition of assistive technology devices by children with disabilities; (c) Selecting, designing, fitting, customizing, adapting, applying, maintaining, repairing, or replacing assistive technology devices; (d) Coordinating and using other therapies, interventions, or services with assistive technology devices, such as those associated with existing education and rehabilitation plans and programs; (e) Training or technical assistance for a child with a disability or, if appropriate, that child's family; and (f) Training or technical assistance for professionals (including individuals providing education or rehabilitation services), employers, or other individuals who provide services to, employ, or are otherwise substantially involved in the major life functions of that child."

34 CFR 300.105, Assistive technology (the school's obligation):

> "(a) Each public agency must ensure that assistive technology devices or assistive technology services, or both, as those terms are defined in §§ 300.5 and 300.6, respectively, are made available to a child with a disability if required as a part of the child's— (1) Special education under § 300.39; (2) Related services under § 300.34; or (3) Supplementary aids and services under §§ 300.42 and 300.114(a)(2)(ii).
> (b) On a case-by-case basis, the use of school-purchased assistive technology devices in a child's home or in other settings is required if the child's IEP Team determines that the child needs access to those devices in order to receive FAPE."

34 CFR 300.324(a)(2)(v), what the IEP Team must consider: "Consider whether the child needs assistive technology devices and services."

34 CFR 300.34(a): related services "includes speech-language pathology and audiology services"; 300.34(c)(15) defines speech-language pathology services to include "Identification of children with speech or language impairments", "Diagnosis and appraisal of specific speech or language impairments", and "Referral for medical or other professional attention necessary for the habilitation of speech or language impairments".

Who pays when the device is in the IEP. 34 CFR 300.17: FAPE "means special education and related services that— (a) Are provided at public expense, under public supervision and direction, and without charge". 34 CFR 300.103(a): "Each State may use whatever State, local, Federal, and private sources of support that are available in the State to meet the requirements of this part." 300.103(b): "Nothing in this part relieves an insurer or similar third party from an otherwise valid obligation to provide or to pay for services provided to a child with a disability." 300.103(c): "the State must ensure that there is no delay in implementing a child's IEP, including any case in which the payment source for providing or paying for special education and related services to the child is being determined." 34 CFR 300.154(a)(1): "The financial responsibility of each noneducational public agency described in paragraph (b) of this section, including the State Medicaid agency and other public insurers of children with disabilities, must precede the financial responsibility of the LEA". 300.154(b)(1)(i) names "services described in § 300.5 relating to assistive technology devices, § 300.6 relating to assistive technology services" among the services such an agency must pay for if otherwise obligated.

Plainly: if the IEP calls for AT, the district must make it available at no charge to the family; the district may use Medicaid or other sources, and the regulation puts Medicaid's financial responsibility ahead of the district's, but the district cannot delay the IEP while payment is sorted out.

Does the school keep the device. The regulation text uses the phrase "school-purchased assistive technology devices" (300.105(b)) and requires their use at home "on a case-by-case basis" when the IEP Team so determines. The regulation does not say who owns the device or what happens when the child leaves the school. I found no federal regulation text on that point; not stated.

---

## 4. What the makers' own funding pages say (vendor descriptions, labeled as such)

### Tobii Dynavox (US funding page, https://us.tobiidynavox.com/pages/funding; read on the vendor's site)

Vendor's own words:
- "in the U.S., most of our devices are eligible for coverage under Medicare, Medicaid, and Private Insurance."
- Steps: "A speech-language pathologist (SLP) conducts an assessment and writes an evaluation of your communication needs." "After a face-to-face meeting, your physician will prescribe a device." "Complete and submit funding packet". "The insurance company reviews your application to decide if they will authorize coverage of a device."
- "An SLP evaluation is required for all funding applications."
- "Most funding sources require a speech evaluation report and a physician's prescription listing all the specific equipment being recommended for purchase. Tobii Dynavox will request that you complete a 'Client Information Form', a 'Release of Information Form' as well as send front and back copies of your insurance cards and provide an equipment quote with your funding packet".
- Timeline: "As a general rule, it takes 30-60 days from the time we receive your completed packet for the funding process to be completed and an order to be shipped."
- "The speech evaluation must be no more than 6 months old at the time the device is shipped to you."
- "a recent physician's visit must be on file within 6 months of the speech device prescription date." "At the current time, most insurers are not requiring Face-to-Face exams."
- Trials: "Your funding source may require that you complete a trial before they agree to cover the cost of a speech generating device. Many of our devices are available for trial ... for a period of up to four weeks."
- "Most funding sources are in agreement that a speech device should last for at least 5 years."
- Codes to give an insurer: "e2510 – Speech generating device; e2512 – Mounting system; e2599 – Accessories for speech generating devices."
- "Tobii Dynavox participates with Medicaid Fee for Services in all states." "Tobii Dynavox is a certified Medicare provider".
- "Most state Medicaid programs require CCCs for the SLP Evaluation to obtain a speech generating device."
- "School SLP Tips for Writing Funding-Ready Evaluation Reports" is offered as a resource (title only; content not read).
- After a trial: "Many of our clients download the software they were using during their trial on an commercial tablet. Free versions of our software and apps are often available through the app store".

Nothing on this page describes a school purchase order path; the page is written for insurance, Medicare and Medicaid.

### PRC-Saltillo (Accent, NovaChat, LAMP Words for Life, TouchChat)

- https://www.prc-saltillo.com/funding and the product pages at https://www.prc-saltillo.com/products/accent-1000, /accent-1400, /novachat returned HTTP 200 but the pages are a JavaScript shell (the HTML body holds only the navigation: "Store", "AAC Devices", "Accent", "NovaChat", "Via", "Warranties"); no funding or price text is served to a non-browser client. The funding page links to https://aacfunding.com, which is blocked at the proxy. https://store.prc-saltillo.com/ serves only a page titled "EzCommerce Sales Module" with no content.
- PRC-Saltillo's app sites did open. https://touchchatapp.com/ (footer "© 2021 PRC-Saltillo") and https://lampwflapp.com/ both carry the sentence: "PRC and Saltillo assists SLPs, caregivers and/or educators through the process of creating a submission packet, whether funding an AAC device through Medicare/Medicaid or private insurance." LAMP's page adds "Did you know you can get this app on a funded device? Find out how" (link to aacfunding.com, blocked). Neither page states documentation lists, timelines, or a school purchase path.

### Forbes AAC (ProSlate, WinSlate), Talk To Me Technologies, AbleNet (QuickTalker Freestyle)

forbesaac.com, talktometechnologies.com and ablenetinc.com are all blocked at the proxy (CONNECT 403, retried with a browser user agent and on the bare and www hostnames). Nothing from these vendors is reported here. AssistiveWare's page (below) says AbleNet handles insurance funding for AAC apps; that is AssistiveWare's statement, not AbleNet's.

### Smartbox (Grid), https://www.thinksmartbox.com/funding/

Vendor's words: "Find out how to try our technology around the world, by getting in touch with the right team to arrange a visit or request a quote." "Anyone can access a free trial of Grid on a Windows or iPad. Simply find the trial options you'd like to try and download Grid for 30 or 60 days for free." No US Medicaid or school process is described on this page.

### AssistiveWare (Proloquo2Go, Proloquo)

- https://www.assistiveware.com/products/proloquo2go: "Is Proloquo2Go covered by insurance or Medicaid? ... Our partner, AbleNet, specializes in guiding people through the insurance process for AAC apps and devices. AbleNet works with ALL speech-language pathologists, regardless of their experience with speech devices."
- https://www.assistiveware.com/products/proloquo-school-licenses (the newer subscription app, Proloquo, not Proloquo2Go): "Purchase the number of copies of Proloquo you need in one place, whether you just need one copy for five years or 100 copies for a year." "Important note for Apple School Manager users: If you're a school or district using Apple School Manager to manage apps, you might notice that Proloquo can be downloaded as a free app. ... While you can download Proloquo through Apple School Manager at no cost, a valid license or subscription is still required to use the app. Subscription purchases are not possible in Apple School Manager, so licenses must be purchased directly through AssistiveWare." Prices: 1-year license $99.99; 2-year $199.99; 3-year $299.99; 4-year $399.99; 5-year $499.99 (USD, per license; the page says the license "is centered around ... the student" and "You can install and use Proloquo on additional devices used by the same student at no extra cost").

---

## 5. Prices

Dedicated devices, from the makers' own pages:

| Device | Maker | Price on maker's page | Note |
|---|---|---|---|
| Accent 1000, Accent 1400 | PRC-Saltillo | Not readable | Product pages are a JavaScript shell; store page is an empty "EzCommerce Sales Module" (https://www.prc-saltillo.com/products/accent-1000, /accent-1400, https://store.prc-saltillo.com/) |
| NovaChat | PRC-Saltillo | Not readable | Same |
| TD I-110 | Tobii Dynavox | By quote | https://www.tobiidynavox.com/products/td-i-110 and https://us.tobiidynavox.com/products/td-i-110 show no price. "How to buy" page (https://www.tobiidynavox.com/pages/how-to-buy): "If you are interested in learning more about a product, pricing, or if you are ready to order, please provide your details below and our local representatives will be in touch shortly." |
| TD I-13 / TD I-16 | Tobii Dynavox | By quote | https://www.tobiidynavox.com/pages/td-i-series describes both ("custom-built AAC devices", "5-year warranty") with no price; /products/td-i-13 returned 404 |
| QuickTalker Freestyle | AbleNet | Not checked | ablenetinc.com blocked at proxy |
| ProSlate / WinSlate | Forbes AAC | Not checked | forbesaac.com blocked at proxy |

Apps, US App Store prices read through Apple's own iTunes lookup/search endpoints (https://itunes.apple.com/lookup?id=308368164,551215116&country=us and https://itunes.apple.com/search?term=touchchat&entity=software&country=us), which return the same data as the apps.apple.com listing pages linked below:

| App | Seller (as listed) | US price | App Store page |
|---|---|---|---|
| Proloquo2Go AAC | AssistiveWare B.V. | $249.99 | https://apps.apple.com/us/app/proloquo2go-aac/id308368164 |
| LAMP Words For Life | Prentke Romich Company | $299.99 | https://apps.apple.com/us/app/lamp-words-for-life/id551215116 |
| TouchChat HD - AAC | Prentke Romich Company | $149.99 | https://apps.apple.com/us/app/touchchat-hd-aac/id398860728 |
| TouchChat HD- AAC w/ WordPower | Prentke Romich Company | $299.99 | https://apps.apple.com/us/app/touchchat-hd-aac-w-wordpower/id412351574 |
| TouchChat Discover | Prentke Romich Company | Free (touchchatapp.com: "upgrade to HD - Lite with an in-app purchase") | https://apps.apple.com/us/app/touchchat-discover/id427022529 |
| Proloquo (subscription app) | AssistiveWare B.V. | Free download; school licenses $99.99 to $499.99 per license (section 4) | https://apps.apple.com/us/app/proloquo/id1521978238 |

Comparison in one line: a district can put a $149.99 to $299.99 app on a tablet it already owns; Medicare's Florida allowable for the equivalent dedicated device class (E2510) is $9,645.69 and Florida Medicaid's maximum is $6,240.51. The device makers do not publish the prices behind those allowables on the pages I could read.

---

## 6. Apple's education volume purchasing

Apple's own statements:

- Apple School Manager User Guide, "Intro to Apps and Books licenses" (https://support.apple.com/guide/apple-school-manager/intro-to-apps-and-books-licenses-axme19b23f7f/web): "When you get licenses for apps there, you can access special pricing for 20 or more copies if you're an eligible education organization—either an organization for grades K–12 (or their districts), or one for higher education if the organization is accredited and grants degrees. For books, special pricing isn't available."
- Apple Education Deployment Guide, "App and book purchases" (https://support.apple.com/guide/deployment-education/app-and-book-purchases-edub2bcccc1f/web): same "special pricing for 20 or more copies" wording, plus "You can also revoke and reassign apps to different devices and users, so your organization retains full ownership and control of purchased apps."
- The percentage is stated on Apple's developer pages, not the school-facing pages. https://developer.apple.com/education/: "Offering an education discount: You can enable a 50% discount for educational institutions that purchase 20 or more copies of your iOS app or Mac app. Opt your apps in or out of special pricing at any time in App Store Connect." App Store Connect reference, App pricing and availability (https://developer.apple.com/help/app-store-connect/reference/pricing-and-availability/app-pricing-and-availability): "Available at a reduced price for educational institutions: You can enable a 50% discount for educational institutions that purchase 20 or more copies of your iOS app or Mac app." and "Available for education and business without a reduced price: Your app will be available for Apple Business and Apple School Manager without a reduced price."
- Apple support article 102867 (https://support.apple.com/102867), "Available features and payment methods for Apple School Manager": for the United States the volume store content is "Apps and books" and payment methods listed are "VPP Credit, American Express, Discover, Mastercard, Visa".

So the discount is opt-in per developer, and Apple's page says the developer chooses. Whether the AAC apps participate: not stated on any maker page I could read. PRC-Saltillo's app pages do not mention Apple School Manager or education pricing. AssistiveWare's school-license page (section 4) says Proloquo (subscription) shows as free in Apple School Manager and the license must be bought from AssistiveWare; its Proloquo2Go page does not mention Apple School Manager. Whether Proloquo2Go, LAMP or TouchChat are opted in to the 50 percent tier could only be confirmed from inside Apple School Manager, which I cannot open.

---

## 7. Florida specifics

### FAAST (Florida Alliance for Assistive Services and Technology), faast.org

Contrary to the brief's expectation, https://faast.org/ opened (the www. hostname is blocked at the proxy; the bare hostname is not). Pages read: home, https://faast.org/services/, https://faast.org/services/device-demonstrations/, https://faast.org/library/. The page https://faast.org/services/short-term-device-loans/ returned HTTP 403 from the site itself (with and without a browser user agent).

FAAST's own words:
- Home: "Short-Term Device Loans: FAAST has a variety of assistive technology devices that can be borrowed at no cost to the individual. These short-term loans help individuals decide the most appropriate device to purchase and can also be used as short-term accommodations."
- Lending Library: "We have a device library with hundreds of devices to try out for a short period of time, at no cost to you." "Think of it as a 'Try before you buy.' * Please be aware that at this time we can only lend devices to individuals in the State of Florida." Categories listed include "Speech Communication".
- Device demonstrations: "Do I need a prescription from my health care provider? No, you do not need a prescription to participate in a device demonstration." "#FAASTFact: In 2020, 931 device demonstrations projected a modest statewide savings of $46,550. The most popular types of devices demonstrated were speech and communication devices."
- Home: "FAAST has an alternative financing program that gives individuals who have disabilities the option to purchase assistive technology devices and services through low-interest rate financial loans." "In 2021, FAAST reached the milestone of funding over $1.45 MILLION in funded loans since the program began in June 2015."
- Funding: "This website was made possible by the U.S. Department of Health and Human Services, Administration for Community Living. FAAST also receives funding from the Florida Department of Education, Division of Vocational Rehabilitation."

### FDLRS assistive technology loan program

fdlrs.org and www.fdlrs.org are blocked at the proxy (CONNECT 403). Nothing about the FDLRS loan program is reported here. To open it, the client would need the egress policy to allow fdlrs.org (and fldoe.org, which hosts FDLRS material and is listed in the brief as blocked).

### flrules.org, Rule 59G-4.070

flrules.org and www.flrules.org are blocked at the proxy (CONNECT 403). AHCA's own pages link flrules.org entries for 59G-4.072 through 59G-4.077 and 59G-4.324 but show no 59G-4.070 entry. The SGD language available from Florida's own source is Rule 59G-4.072 as quoted in section 2b. To read 59G-4.070 itself the client would need the proxy to allow flrules.org; the URL AHCA uses for its sister rules is of the form https://www.flrules.org/gateway/ruleNo.asp?id=59G-4.072, so the general rule would presumably be at ...?id=59G-4.070 (that URL pattern is an inference from AHCA's links, not a page I opened).

---

## Who pays, how much

| Device or app | Typical payer | Code or program | Amount | Source |
|---|---|---|---|---|
| Dedicated SGD, digitized speech (e.g. simple button device) | Medicare (adult) | E2500 to E2506 | Florida NR allowable $557.30 to $3,296.27 (purchase, NU) | CMS DME26-C fee schedule CSV, https://www.cms.gov/files/zip/dme26-c.zip |
| Dedicated SGD, synthesized, spelling access | Medicare | E2508 | $5,097.15 (NU); $509.71 (RR); $3,822.88 (UE), Florida NR | same |
| Dedicated SGD, synthesized, multiple access methods (the Accent / TD I-Series class, per the code description) | Medicare | E2510 | $9,645.69 (NU); $964.56 (RR); $7,234.25 (UE), Florida NR | same |
| SGD software for a computer or PDA | Medicare | E2511 | 0.00 in the fee file (no listed amount; reason not stated) | same |
| Dedicated SGD, all classes | Florida Medicaid (child on Medicaid) | E2500 to E2510, prior authorization by QIO, 1 per 5 years | $360.56 (E2500) to $6,240.51 (E2510) maximum fee | AHCA DME fee schedule July 1, 2026 |
| SGD software | Florida Medicaid | E2511, PA, 1 per 5 years | "MP": "must be negotiated between the provider and the Agency's contracted quality improvement organization" | same |
| Mounting system | Florida Medicaid | E2512, PA | MP | same |
| Consumer tablet or smartphone as the AAC device | Florida Medicaid | none | Not covered: "computers, tablets, smartphones, or other general computing devices" excluded | Rule 59G-4.072 section 5.2 |
| AAC evaluation by school SLP / OT / PT | Florida Medicaid, billed by district (federal share only) | Certified School Match, 92597 (GO, GP) | $102.63, 1 per 5 years | 2026 Certified School Match Fee Schedule |
| AAC re-evaluation by school SLP | same | 92597 GN | $52.63, 1 per 6 months | same |
| AAC fitting, adjustment, training visit | same | 92609 | $42.11, 8 per year | same |
| Any AT device or service written into an IEP | School district (public agency), "at public expense ... without charge"; Medicaid's responsibility "must precede" the LEA's where Medicaid is obligated | IDEA, 34 CFR 300.105, 300.17, 300.154 | No amount in the regulation | eCFR |
| Proloquo2Go | Family or district, out of pocket or district budget | App Store | $249.99 | apps.apple.com |
| LAMP Words for Life | same | App Store | $299.99 | apps.apple.com |
| TouchChat HD - AAC / with WordPower | same | App Store | $149.99 / $299.99 | apps.apple.com |
| Proloquo (subscription) school license | District, direct from AssistiveWare | AssistiveWare school license | $99.99 (1 yr) to $499.99 (5 yr) per license | assistiveware.com |
| Any app bought 20+ copies by a K-12 organization | District via Apple School Manager | Apple education pricing, developer opt-in | "50% discount" per Apple's developer page, if the developer opted in | developer.apple.com/education, ASM guide |
| Accent 1000/1400, NovaChat, TD I-110, TD I-13/16 | Insurance, Medicare, Medicaid, or district | vendor quote | By quote (no price on maker pages read) | prc-saltillo.com (unreadable shell), tobiidynavox.com "How to buy" form |
| QuickTalker Freestyle, ProSlate/WinSlate | not checked | not checked | not checked | ablenetinc.com and forbesaac.com blocked |
| Trial or loan of a device before purchase (Florida) | No charge | FAAST lending library / device demonstrations | "at no cost to the individual" | faast.org |

---

## Blocked or not checked

Blocked at the proxy (CONNECT 403; retried once with a browser user agent; also tried the alternate bare or www hostname):
- https://www.flrules.org/gateway/ruleNo.asp?id=59G-4.070 and https://flrules.org/ (Florida rule text for 59G-4.070)
- https://www.fdlrs.org/ and https://fdlrs.org/ (FDLRS AT loan program)
- https://www.faast.org/services/short-term-device-loans/ (www hostname; the bare hostname opened but that one page returned HTTP 403 from the site)
- https://www.forbesaac.com/funding and https://forbesaac.com/ (Forbes AAC funding and ProSlate/WinSlate prices)
- https://www.talktometechnologies.com/pages/funding and https://www.talktometechnologies.com/
- https://www.ablenetinc.com/funding/ and https://ablenetinc.com/ (AbleNet funding; QuickTalker Freestyle price)
- https://aacfunding.com (PRC-Saltillo's funding site, linked from prc-saltillo.com, touchchatapp.com and lampwflapp.com)
- https://www.medicaid.gov/medicaid/financial-management/medicaid-administrative-claiming/school-based-services/index.html (CMS school-based services)

Reachable but unreadable:
- https://www.prc-saltillo.com/funding, /products, /products/accent-1000, /products/accent-1400, /products/novachat, /sitemap.xml: HTTP 200 but JavaScript-rendered; only navigation labels are served. https://store.prc-saltillo.com/: an empty "EzCommerce Sales Module" page.
- https://aacapps.com/: TLS certificate error ("unable to get local issuer certificate"); not opened.
- https://api.coverage.cms.gov/v1/data/lcd/?lcdid=33739: HTTP 401, CMS's API requires a token for LCDs. The LCD text was read from the public page HTML instead, so this did not cost anything.
- https://www.tobiidynavox.com/products/td-i-13: 404. The I-Series page was read instead.
- https://www.tobiidynavox.com/collections/devices/products.json and /products/td-i-110.js and .json: 404 or empty; no price data exposed.

Not attempted, per the brief's statement that they are blocked: asha.org, pubs.asha.org, fldoe.org, ed.gov subdomains other than ecfr.gov (ies.ed.gov was not needed for this slice).

Not found:
- A Florida rule or PDF titled 59G-4.070 on any AHCA page read (https://ahca.myflorida.com/medicaid/rules/adopted-rules-service-specific-policies.html, .../adopted-rules-general-policies.html, .../adopted-rules-main-page.html, .../rules-in-process.html).
- The 50 percent figure on Apple's school-facing pages (they say "special pricing for 20 or more copies"); the figure appears on Apple's developer pages, cited above.
- Any maker statement that Proloquo2Go, LAMP Words for Life or TouchChat are opted in to Apple's education discount.
- Any federal regulation text on who owns a school-purchased AT device after the child leaves.

Redirects to note: https://www.apple.com/education/k12/how-to-buy/ and https://www.apple.com/education/k12/it/ both resolve to https://www.apple.com/education/k12/ (canonical); https://www.apple.com/education/volume-purchase-program/ returns 404.

Older document: the Medicaid Certified School Match handbook is dated January 2005 on its pages and refers to MediPass; AHCA still lists it as the adopted handbook. The 2026 school-match fee schedule is current. Where the two differ, the fee schedule is the newer document.

---

## What this means for a company selling software to districts

1. The Medicaid and Medicare SGD pipeline pays a DME provider for a device delivered to a specific child at home, after an SLP evaluation, a physician prescription, and prior authorization; it does not pay a school district for software on district-owned tablets.
2. Florida Medicaid's policy excludes "computers, tablets, smartphones, or other general computing devices" outright, so an app on a district iPad is outside the Florida Medicaid DME benefit no matter how the app is coded.
3. The one software code, E2511, carries no Medicare fee amount in the July 2026 file and is "manually priced" with prior authorization in Florida Medicaid, so even a software-only claim has no published price to anchor to.
4. Under Medicare's LCD the evaluating SLP "may not be an employee of or have a financial relationship with the supplier of the SGD", and Florida's school-match handbook bars the ID team from any financial relationship with the manufacturer; a vendor cannot run the evaluation that funds its own product.
5. Under IDEA the district must make AT available "at public expense" once the IEP Team decides the child needs it, and must not delay the IEP while it works out who pays; that obligation is what makes the district a buyer of software in its own right.
6. Florida districts can bill Medicaid (federal share only) for the school SLP's AAC evaluation ($102.63), re-evaluation ($52.63) and training visits ($42.11); those codes pay for clinician time, not for software, so they do not fund a license either.
7. The app makers already sell into districts on this basis: App Store prices of $149.99 to $299.99, and AssistiveWare's school licenses of $99.99 a year to $499.99 for five years, bought from the maker rather than through Medicaid.
8. Apple School Manager gives K-12 organizations "special pricing for 20 or more copies", and Apple's developer page puts that at a 50 percent discount that the developer opts into; a district buying 20 licenses is therefore also a price-sensitive buyer expecting that tier, and AssistiveWare sidesteps it by selling subscriptions directly.
9. For a software-only product on district-owned devices the buyer is the district (special education or assistive technology office, spending IDEA and general funds), the influencer is the school SLP who writes the AT consideration in the IEP, and Medicaid is not in the room.
10. The Medicaid pipeline matters to the company only in the other direction: a family whose child gets a funded dedicated device through a DME provider has, in Florida, one device per five years, and the makers say the same device should last five years, so a district app is the everyday and classroom layer rather than a replacement for that device.
