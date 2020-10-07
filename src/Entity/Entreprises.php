<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\EntreprisesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=EntreprisesRepository::class)
 * @ApiResource(
 *   normalizationContext={
 *      "groups" = {"entreprises_read"}
 * }
 * )
 */
class Entreprises
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"entreprises_read", "bons_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"entreprises_read", "bons_read", "pdvs_read", "techniciens_read", "users_read", "comptes_read"})
     */
    private $nom;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"entreprises_read", "bons_read"})
     */
    private $rue;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"entreprises_read", "bons_read"})
     */
    private $npa;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"entreprises_read", "bons_read"})
     */
    private $lieu;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"entreprises_read", "bons_read"})
     */
    private $telephone;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"entreprises_read", "bons_read"})
     */
    private $fax;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"entreprises_read", "bons_read"})
     */
    private $mail;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $supprimer;

    /**
     * @ORM\OneToMany(targetEntity=Bons::class, mappedBy="entreprise")
     * @Groups({"entreprises_read"})
     */
    private $bons;

    /**
     * @ORM\ManyToOne(targetEntity=Departements::class, inversedBy="entreprises")
     * @Groups({"entreprises_read"})
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

    public function getRue(): ?string
    {
        return $this->rue;
    }

    public function setRue(?string $rue): self
    {
        $this->rue = $rue;

        return $this;
    }

    public function getNpa(): ?int
    {
        return $this->npa;
    }

    public function setNpa(?int $npa): self
    {
        $this->npa = $npa;

        return $this;
    }

    public function getLieu(): ?string
    {
        return $this->lieu;
    }

    public function setLieu(?string $lieu): self
    {
        $this->lieu = $lieu;

        return $this;
    }

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function setTelephone(?string $telephone): self
    {
        $this->telephone = $telephone;

        return $this;
    }

    public function getFax(): ?string
    {
        return $this->fax;
    }

    public function setFax(?string $fax): self
    {
        $this->fax = $fax;

        return $this;
    }

    public function getMail(): ?string
    {
        return $this->mail;
    }

    public function setMail(?string $mail): self
    {
        $this->mail = $mail;

        return $this;
    }

    public function getSupprimer(): ?bool
    {
        return $this->supprimer;
    }

    public function setSupprimer(?bool $supprimer): self
    {
        $this->supprimer = $supprimer;

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
            $bon->setEntreprise($this);
        }

        return $this;
    }

    public function removeBon(Bons $bon): self
    {
        if ($this->bons->contains($bon)) {
            $this->bons->removeElement($bon);
            // set the owning side to null (unless already changed)
            if ($bon->getEntreprise() === $this) {
                $bon->setEntreprise(null);
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
