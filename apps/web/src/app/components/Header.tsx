import { AdaptiveLumenNav } from "@pixelsandpetals/ui";
import { BlobMenu } from "@/app/components/BlobMenu";
import { CommandPalette } from "@/app/components/CommandPalette";

const navItems = [
  { id: "home", label: "Home", href: "#home-section", active: false as boolean | undefined },
  { id: "projects", label: "Solutions", href: "#projects-section", active: false as boolean | undefined },
  { id: "clients", label: "Partners", href: "#clients-section", active: false as boolean | undefined },
  { id: "about", label: "About", href: "#about-section", active: false as boolean | undefined },
  { id: "contact", label: "Connect", href: "#contact-section", active: false as boolean | undefined },
  { id: "resume", label: "Resume", href: "/resume.pdf", active: false as boolean | undefined },
];

const contextualSuggestions = [
  {
    id: "start-project",
    text: "Start Your Project?",
    icon: "🚀",
    action: () => {
      document.getElementById("contact-section")?.scrollIntoView({ behavior: 'smooth' });
    },
    condition: (scrollPosition: number, timeOnPage: number, currentPage: string) => {
      // Show after 30 seconds on page or if scrolled through projects
      return timeOnPage > 30 || scrollPosition > 1500;
    }
  },
  {
    id: "explore-expertise",
    text: "Explore All Expertise",
    icon: "🧠",
    action: () => {
      document.getElementById("about-section")?.scrollIntoView({ behavior: 'smooth' });
    },
    condition: (scrollPosition: number, timeOnPage: number, currentPage: string) => {
      // Show if user has scrolled through multiple projects
      return scrollPosition > 2000;
    }
  },
  {
    id: "view-case-studies",
    text: "View Case Studies",
    icon: "📊",
    action: () => {
      document.getElementById("projects-section")?.scrollIntoView({ behavior: 'smooth' });
    },
    condition: (scrollPosition: number, timeOnPage: number, currentPage: string) => {
      // Show if user is in clients section
      return scrollPosition > 2500 && scrollPosition < 3500;
    }
  }
];

export default function Header() {
  type NavItem = {
    id: string;
    label: string;
    href: string;
    active?: boolean;
  };

  const handleItemClick = (item: NavItem) => {
    const element = document.getElementById(item.href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
    // Implement search functionality here
    // For now, we'll scroll to the most relevant section
    if (query.toLowerCase().includes("project")) {
      document.getElementById("projects-section")?.scrollIntoView({ behavior: 'smooth' });
    } else if (query.toLowerCase().includes("contact")) {
      document.getElementById("contact-section")?.scrollIntoView({ behavior: 'smooth' });
    } else if (query.toLowerCase().includes("about")) {
      document.getElementById("about-section")?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <AdaptiveLumenNav
        items={navItems}
        logo="Pixels & Petals"
        onItemClick={handleItemClick}
        onSearch={handleSearch}
        contextualSuggestions={contextualSuggestions}
      />
      <BlobMenu />
      <CommandPalette />
    </>
  );
}
