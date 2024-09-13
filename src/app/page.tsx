"use client";

import { useEffect } from "react";
// import { formatDateTime } from "~/utils/FormatDay";
import Image from "next/image";
import images from "~/assets/img";
import { AppDispatch, RootState } from "~/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject } from "~/store/slices/issues/ProjectSlice ";
import { RingLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { formatDateTime } from "~/utils/FormatDay";

export default function Home() {
  const router = useRouter();

  const dispatch: AppDispatch = useDispatch();
  const { project, loading: loadingProject } = useSelector(
    (state: RootState) => state.project,
  );
  useEffect(() => {
    if (project?.length === 0) {
      dispatch(fetchProject());
    }
  }, [dispatch, project?.length]);

  const handleNavigation = (identifier: string, name: string) => {
    router.push(`/projects/${identifier}/overview`);
  };

  return (
    <div className="flex justify-between">
      <h2 className="text-xl font-semibold">Home</h2>
      <div className="mt-10 mr-2 border border-gray-300 border-solid min-h-[120px] min-w-[772px]">
        <div className="p-3">
          <div className="flex items-center gap-1">
            <Image
              src={images.homepage}
              width={16}
              height={16}
              alt="redmine_ntq_solutions"
            />
            <h3 className=" font-medium">Latest projects</h3>
          </div>
          {loadingProject ? (
            <div className="flex justify-center items-center h-24">
              <RingLoader color="#34d2c8" speedMultiplier={2} />
            </div>
          ) : (
            <ul className="pl-10 pt-3 list-disc">
              {project.map((project: any) => (
                <li className="text-xs" key={project.id}>
                  <button
                    onClick={() =>
                      handleNavigation(project?.identifier, project.name)
                    }
                    className="text-[#169] hover:underline hover:text-[#b2290f]"
                  >
                    {project.name}
                  </button>
                  ({formatDateTime(project.created_on)})<br></br>
                  {project.description}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
