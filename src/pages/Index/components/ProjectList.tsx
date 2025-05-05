
import React from 'react';
import { Project } from '@/lib/types';
import ProjectCard from '@/components/ProjectCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ProjectListProps {
  projects: Project[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  onSelectProject: (projectId: string) => void;
  onDeleteProject: (projectId: string) => void;
  onDuplicateProject: (projectId: string) => void;
  onRenameProject: (projectId: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  currentPage,
  totalPages,
  setCurrentPage,
  onSelectProject,
  onDeleteProject,
  onDuplicateProject,
  onRenameProject
}) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={onSelectProject}
            onDelete={onDeleteProject}
            onDuplicate={onDuplicateProject}
            onRename={onRenameProject}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1);
                    }
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) {
                      setCurrentPage(currentPage + 1);
                    }
                  }}
                  className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
};

export default ProjectList;
