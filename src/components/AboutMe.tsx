"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin, Twitter, Github } from "lucide-react";
import Blurb from "./blurb";

export default function AboutMe() {
  return (
    <div className="bg-primary-foreground flex items-center justify-center p-8">
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-48 h-48 relative">
            <Image
              src="https://pbs.twimg.com/profile_images/1587263365579153409/t_VlEDyS_400x400.jpg"
              alt="Anil Talla"
              width={192}
              height={192}
              className="rounded-full"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAJJgNnXNitCwAAAABJRU5ErkJggg=="
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-2">
              Hello, I&apos;m Anil Talla
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-400 mb-4">
              Director of Engineering at Autodesk, Inc.
            </h2>
            <p className="text-lg mb-6">
              I&apos;m a passionate software engineering technology leader who loves
              building products and solving complex business problems in a
              simple way. Though I enjoy leading &amp; managing engineering teams, I
              also love coding, architecting, and sharing my learnings.
            </p>
            <p className="text-lg mb-8">
              I am here to share knowledge, visit my profile &amp; stay connected
              with me.
            </p>
            <Blurb />
            <div className="flex justify-center md:justify-start space-x-4">
              <SocialLink
                href="https://www.linkedin.com/in/anilkumartalla/"
                icon={<Linkedin className="w-6 h-6" />}
              />
              <SocialLink
                href="https://x.com/anilktalla"
                icon={<Twitter className="w-6 h-6" />}
              />
              <SocialLink
                href="https://github.com/anilktalla"
                icon={<Github className="w-6 h-6" />}
              />
              <SocialLink
                href="https://anilktalla.medium.com/"
                icon={<MediumIcon className="w-6 h-6" />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-white transition-colors"
    >
      {icon}
    </Link>
  );
}

function MediumIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  );
}