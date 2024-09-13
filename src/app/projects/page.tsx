'use client';

import React, { useEffect } from 'react';
import { AppDispatch, RootState } from '~/store/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import images from '~/assets/img';
import { RingLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
import { fetchProject } from '~/store/slices/issues/ProjectSlice ';

interface Project {
  id: number;
  name: string;
  description: string;
  identifier: string;
}

const ProjectPage = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { project, loading: loadingProject } = useSelector(
    (state: RootState) => state.project
  );

  useEffect(() => {
    if (project?.length === 0) {
      dispatch(fetchProject());
    }
  }, [dispatch, project?.length]);

  const handleNavigate = (identifier: string, name: string) => {
    router.push(`/projects/${identifier}/overview`);
  };

  return (
    <div>
      {loadingProject ? (
        <div className="flex justify-center items-center h-24">
          <RingLoader color="#34d2c8" speedMultiplier={2} />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-xl font-semibold text-[#555]">Projects</h2>
            <div className="text-11">
              <a
                className="text-primary hover:underline hover:text-[#b2290f]"
                href="/issues"
              >
                View all issues
              </a>{' '}
              |{' '}
              <a
                className="text-primary hover:underline hover:text-[#b2290f]"
                href="/time_entries"
              >
                Overall spent time
              </a>{' '}
              |{' '}
              <a
                className="text-primary hover:underline hover:text-[#b2290f]"
                href="/activity"
              >
                Overall activity
              </a>
            </div>
          </div>
          {project?.map((project) => (
            <div key={project.id} className="mb-3">
              <button
                onClick={() => handleNavigate(project.identifier, project.name)}
                className="text-[#169] font-semibold hover:underline hover:text-[#b2290f]"
              >
                {project.name}
              </button>
              <div className="text-xs">{project.description}</div>
            </div>
          ))}
          <div className="flex items-center justify-end text-xs my-3">
            <Image src={images.fav} alt="fav" />
            <span>My projects</span>
          </div>
          <div className="flex items-center justify-end gap-1 text-11">
            <span>Also available in:</span>
            <a
              className="flex items-center gap-0.5 text-[#169] hover:underline hover:text-[#b2290f]"
              href=""
            >
              <Image src={images.feedproject} alt="feedproject" />
              <span>Atom</span>
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectPage;
