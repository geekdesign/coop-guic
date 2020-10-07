<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\TypesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=TypesRepository::class)
 * @ApiResource(
 *   normalizationContext={
 *      "groups" = {"types_read"}
 * }
 * )
 * @ApiFilter(SearchFilter::class)
 * @ApiFilter(OrderFilter::class)
 */
class Types
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"types_read", "bons_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"types_read", "bons_read", "entreprises_read", "pdvs_read", "techniciens_read", "users_read", "comptes_read"})
     */
    private $nom;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"types_read"})
     */
    private $actif;

    /**
     * @ORM\OneToMany(targetEntity=Bons::class, mappedBy="type")
     * @Groups({"types_read"})
     * @ApiSubresource
     */
    private $bons;

    /**
     * @ORM\ManyToOne(targetEntity=Departements::class, inversedBy="types")
     * @Groups({"types_read"})
     */
    private $departement;

    public function __construct()
    {
        $this->bons = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getActif(): ?bool
    {
        return $this->actif;
    }

    public function setActif(?bool $actif): self
    {
        $this->actif = $actif;

        return $this;
    }

    /**
     * @return Collection|Bons[]
     */
    public function getBons(): Collection
    {
        return $this->bons;
    }

    public function addBon(Bons $bon): self
    {
        if (!$this->bons->contains($bon)) {
            $this->bons[] = $bon;
            $bon->setType($this);
        }

        return $this;
    }

    public function removeBon(Bons $bon): self
    {
        if ($this->bons->contains($bon)) {
            $this->bons->removeElement($bon);
            // set the owning side to null (unless already changed)
            if ($bon->getType() === $this) {
                $bon->setType(null);
            }
        }

        return $this;
    }

    public function getDepartement(): ?Departements
    {
        return $this->departement;
    }

    public function setDepartement(?Departements $departement): self
    {
        $this->departement = $departement;

        return $this;
    }
}
