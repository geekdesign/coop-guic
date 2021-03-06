<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\ComptesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=ComptesRepository::class)
 * @ApiResource(
 *   normalizationContext={
 *      "groups" = {"comptes_read"}
 * },
 *   denormalizationContext={
 *        "disable_type_enforcement"=true
 *   }
 * )
 * @ApiFilter(SearchFilter::class)
 * @ApiFilter(OrderFilter::class)
 */
class Comptes
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"comptes_read", "bons_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"comptes_read","bons_read", "pdvs_read"})
     * @Assert\NotBlank(message="Le numéros de compte est obligatoire !")
     */
    private $num;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"comptes_read","bons_read", "pdvs_read"})
     * @Assert\NotBlank(message="Le nom est obligatoire !")
     * @Assert\Length(
     *      min = 3,
     *      max = 255,
     *      minMessage = "Le nom doit faire entre 3 et 255 caractères !",
     *      maxMessage = "Le nom doit faire entre 3 et 255 caractères !",
     *      allowEmptyString = false
     * )
     */
    private $nom;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"comptes_read"})
     * @Assert\NotBlank(message="Le nom est obligatoire !")
     */
    private $actif;

    /**
     * @ORM\OneToMany(targetEntity=Bons::class, mappedBy="numCompte")
     * @Groups({"comptes_read"})
     * @ApiSubresource
     */
    private $bons;

    /**
     * @ORM\ManyToOne(targetEntity=Departements::class, inversedBy="comptes")
     * @Groups({"comptes_read"})
     * @Assert\NotBlank(message="Le nom est obligatoire !")
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

    public function getNum(): ?int
    {
        return $this->num;
    }

    public function setNum($num): self
    {
        $this->num = $num;

        return $this;
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
            $bon->setNumCompte($this);
        }

        return $this;
    }

    public function removeBon(Bons $bon): self
    {
        if ($this->bons->contains($bon)) {
            $this->bons->removeElement($bon);
            // set the owning side to null (unless already changed)
            if ($bon->getNumCompte() === $this) {
                $bon->setNumCompte(null);
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
