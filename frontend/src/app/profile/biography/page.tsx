import React from "react";
import { BiographyForm } from "@/components/forms/biography";
import { DeleteBiographyButton } from "@/components/biography/DeleteBiographyButton";
import LayoutPrivate from '@/components/layout/layoutPrivate';

export default function ProfileBiographyPage() {
  return <LayoutPrivate><div className="m-20 p-20">
    <BiographyForm></BiographyForm>
    <DeleteBiographyButton biographyId={""}></DeleteBiographyButton>
  </div></LayoutPrivate>;
} 