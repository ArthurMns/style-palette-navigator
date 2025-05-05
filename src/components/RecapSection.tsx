
import React, { useState } from 'react';
import { Project } from '@/lib/types';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { FileText, FileDown, Loader2 } from 'lucide-react';
import { sampleColors } from '@/data/sampleData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Checkbox
} from "@/components/ui/checkbox";

interface RecapSectionProps {
  project: Project | null;
  onGeneratePDF: () => void;
  onExportCSV: () => void;
  generatingPDF: boolean;
  generatingCSV: boolean;
}

interface GroupedColor {
  colorId: string;
  name: string;
  desc: string;
  reference: string;
  hexCode: string;
  totalArea: number;
  totalLiters: number;
}

const RecapSection: React.FC<RecapSectionProps> = ({
  project,
  onGeneratePDF,
  onExportCSV,
  generatingPDF,
  generatingCSV
}) => {
  const [includeClientInfo, setIncludeClientInfo] = useState(true);
  const [includeImages, setIncludeImages] = useState(true);
  const [includeColorDetails, setIncludeColorDetails] = useState(true);
  const [includeQuantities, setIncludeQuantities] = useState(true);

  // Grouper et calculer les totaux par couleur
  const groupedColors: GroupedColor[] = [];

  if (project) {
    project.rooms.forEach(room => {
      room.images.forEach(image => {
        image.colorApplied.forEach(pastille => {
          const color = sampleColors.find(c => c.id === pastille.colorId);
          if (color) {
            const existingGroup = groupedColors.find(g => g.colorId === color.id);

            if (existingGroup) {
              existingGroup.totalArea += pastille.area;
              existingGroup.totalLiters += pastille.area * pastille.literPerSqm;
            } else {
              groupedColors.push({
                colorId: color.id,
                name: color.name,
                desc: color.desc,
                reference: color.reference,
                hexCode: color.hexCode,
                totalArea: pastille.area,
                totalLiters: pastille.area * pastille.literPerSqm
              });
            }
          }
        });
      });
    });
  }

  // Calculer le total
  const totalSurface = groupedColors.reduce((sum, group) => sum + group.totalArea, 0);
  const totalLiters = groupedColors.reduce((sum, group) => sum + group.totalLiters, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations générales</CardTitle>
            <CardDescription>Détails du projet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Nom du projet</p>
                <p className="font-medium">{project?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Conseillé</p>
                <p className="font-medium">{project?.conseilleName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date de création</p>
                <p className="font-medium">
                  {project?.createdAt ? new Date(project.createdAt).toLocaleDateString('fr-FR') : '-'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dernière mise à jour</p>
                <p className="font-medium">
                  {project?.updatedAt ? new Date(project.updatedAt).toLocaleDateString('fr-FR') : '-'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nombre de pièces</p>
                <p className="font-medium">{project?.rooms?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Options d'export</CardTitle>
            <CardDescription>Personnalisez les informations à inclure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-images"
                  checked={includeImages}
                  onCheckedChange={(checked) => setIncludeImages(checked === true)}
                />
                <label
                  htmlFor="include-images"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Surface renseignée
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-color-details"
                  checked={includeColorDetails}
                  onCheckedChange={(checked) => setIncludeColorDetails(checked === true)}
                />
                <label
                  htmlFor="include-color-details"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Surface non renseignée
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button
                  onClick={onGeneratePDF}
                  disabled={generatingPDF}
                  className="w-full sm:w-auto"
                >
                  {generatingPDF ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Génération...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Générer PDF client
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={onExportCSV}
                  disabled={generatingCSV}
                  className="w-full sm:w-auto"
                >
                  {generatingCSV ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Export...
                    </>
                  ) : (
                    <>
                      <FileDown className="h-4 w-4 mr-2" />
                      Exporter CSV pour EBP
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Résumé des couleurs</CardTitle>
          <CardDescription>Surfaces, quantités et références par couleur</CardDescription>
        </CardHeader>
        <CardContent>
          {groupedColors.length > 0 ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Couleur</TableHead>
                    <TableHead>Code article</TableHead>
                    <TableHead>Description</TableHead>

                    <TableHead className="text-right">Surface totale</TableHead>
                    <TableHead className="text-right">Quantité</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {groupedColors.map((group) => (
                    <TableRow key={group.colorId}>
                      <TableCell>
                        <div className="flex items-center">
                          <div
                            className="h-4 w-4 rounded-full mr-2"
                            style={{ backgroundColor: group.hexCode }}
                          ></div>
                          {group.name}
                        </div>
                      </TableCell>
                      <TableCell>{group.reference}</TableCell>
                      <TableCell>{group.desc}</TableCell>
                      <TableCell className="text-right">{group.totalArea.toFixed(1)} m²</TableCell>
                      <TableCell className="text-right">{group.totalLiters.toFixed(2)} L</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} className="text-right font-bold">Total:</TableCell>
                    <TableCell className="text-right font-bold">{totalSurface.toFixed(1)} m²</TableCell>
                    <TableCell className="text-right font-bold">{totalLiters.toFixed(2)} L</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="mt-6 text-sm text-gray-500">
                <p>* Les quantités sont calculées selon le litrage par m² défini pour chaque surface.</p>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Aucune couleur n'a été appliquée dans ce projet.</p>
              <p className="text-sm mt-2">Ajoutez des pastilles de couleur sur les photos pour voir le récapitulatif.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecapSection;
